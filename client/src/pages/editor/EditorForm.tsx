import { useEffect, useState } from 'react';
import type { Superhero } from '../../definitions/definitions';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../definitions/definitions';
import { useDebounce } from 'use-debounce';
import styles from './EditorForm.module.css';

export default function EditorForm({
  initialData,
}: {
  initialData?: Superhero;
}) {
  const isEdit = Boolean(initialData);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<Superhero>>({
    nickname: initialData?.nickname || '',
    real_name: initialData?.real_name || '',
    origin_description: initialData?.origin_description || '',
    superpowers: initialData?.superpowers || [],
    catch_phrase: initialData?.catch_phrase || '',
    images: initialData?.images || [],
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [nickname, setNickname] = useState(formData.nickname);
  const [debouncedNickname] = useDebounce(nickname, 500);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);

  useEffect(() => {
    const checkNickname = async () => {
      if (debouncedNickname && debouncedNickname !== initialData?.nickname) {
        setIsCheckingNickname(true);
        try {
          const response = await fetch(
            `${API_URL}/api/v1/superheroes/${debouncedNickname}`
          );
          if (response.ok && !isEdit) {
            setNicknameError(`${nickname} already exists`);
          } else {
            setNicknameError(null);
          }
        } catch (error) {
          console.error('Error checking nickname:', error);
        } finally {
          setIsCheckingNickname(false);
        }
      } else {
        setNicknameError(null);
      }
    };
    checkNickname();
  }, [debouncedNickname, isEdit]);

  const handleChange =
    (field: keyof Superhero) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (field === 'nickname') {
        setNickname(value);
      }
    };

  const onImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);

    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
  };

  const deleteImage = (index: number, isExistingImage: boolean) => {
    if (isExistingImage) {
      setFormData((prev) => ({
        ...prev,
        images: (prev.images || []).filter((_, idx) => idx !== index),
      }));
    } else {
      setImageFiles((prevFiles) => prevFiles.filter((_, idx) => idx !== index));
      URL.revokeObjectURL(imagePreviewUrls[index]);
      setImagePreviewUrls((prevUrls) =>
        prevUrls.filter((_, idx) => idx !== index)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitFormData = new FormData();

      // Ensure all fields are included, even if empty
      const superheroData: Partial<Superhero> = {
        nickname: formData.nickname?.trim() || '',
        real_name: formData.real_name?.trim() || '',
        origin_description: formData.origin_description?.trim() || '',
        superpowers: formData.superpowers || [],
        catch_phrase: formData.catch_phrase?.trim() || '',
        images: formData.images || [],
      };

      submitFormData.append('superheroData', JSON.stringify(superheroData));

      imageFiles.forEach((file) => {
        submitFormData.append('heroImages', file);
      });

      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit
        ? `${API_URL}/api/v1/superheroes/${initialData?.nickname}`
        : `${API_URL}/api/v1/superheroes/create`;

      console.log('Sending data:', {
        url,
        method,
        formDataKeys: Array.from(submitFormData.keys()),
        superheroData,
      });

      const response = await fetch(url, {
        method,
        body: submitFormData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        alert('Failed to submit the form. Please try again.');
        return;
      }

      const responseData = await response.json();
      console.log('Server response:', responseData);
      navigate('/');
    } catch (err) {
      console.error('Failed to submit:', err);
      alert('Failed to submit the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviewUrls]);

  return (
    <div className={styles.heroForm}>
      <h2 className={styles.formTitle}>
        {isEdit ? 'Edit Superhero' : 'Create New Superhero'}
      </h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className={styles.formGroup}>
          <label htmlFor="nickname" className={styles.label}>
            Nickname
          </label>
          <input
            id="nickname"
            className={styles.input}
            type="text"
            value={formData.nickname}
            onChange={handleChange('nickname')}
            placeholder="Superhero nickname"
            required
            disabled={isEdit}
          />
          {nicknameError && (
            <p style={{ color: 'red', fontStyle: 'bold' }}>{nicknameError}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="real_name" className={styles.label}>
            Real Name
          </label>
          <input
            id="real_name"
            className={styles.input}
            type="text"
            value={formData.real_name}
            onChange={handleChange('real_name')}
            placeholder="Hero's real identity"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="origin_description" className={styles.label}>
            Origin Story
          </label>
          <textarea
            id="origin_description"
            className={styles.textarea}
            value={formData.origin_description}
            onChange={handleChange('origin_description')}
            placeholder="How did they become a superhero?"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="catch_phrase" className={styles.label}>
            Catch Phrase
          </label>
          <textarea
            id="catch_phrase"
            className={styles.textarea}
            value={formData.catch_phrase}
            onChange={handleChange('catch_phrase')}
            placeholder="Famous saying or motto"
          />
        </div>

        <div className={styles.formGroup}>      
          <label htmlFor="superpowers" className={styles.label}>
            Superpowers
          </label>
          <input                // to remove an already entered superpower you need to hold CTRL
            id="superpowers"
            className={styles.input}
            type="text"
            value={formData.superpowers?.join(', ')}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                superpowers: e.target.value
                  .split(',')
                  .map((power) => power.trimStart()),
              }))
            }
            placeholder="Flight, super strength, invisibility (comma-separated)"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="images" className={styles.label}>
            Images
          </label>

          {formData.images && formData.images.length > 0 && (
            <div className={styles.imageList}>
              {formData.images.map((imgUrl, index) => (
                <div key={`existing-${index}`} className={styles.imageItem}>
                  <img
                    src={imgUrl}
                    alt={`${formData.nickname} image ${index + 1}`}
                    className={styles.imagePreview}
                  />
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => deleteImage(index, true)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {imagePreviewUrls.length > 0 && (
            <div className={styles.imageList}>
              {imagePreviewUrls.map((previewUrl, index) => (
                <div key={`new-${index}`} className={styles.imageItem}>
                  <img
                    src={previewUrl}
                    alt={`New image ${index + 1}`}
                    className={styles.imagePreview}
                  />
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => deleteImage(index, false)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <input
            id="images"
            className={styles.fileInput}
            type="file"
            name="heroImages"
            accept=".png,.jpg,.jpeg"
            onChange={onImagesChange}
            multiple
            disabled={isSubmitting}
          />
        </div>

        <button
          className={styles.submitButton}
          type="submit"
          disabled={
            nicknameError !== null || isSubmitting || isCheckingNickname
          }
        >
          {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Hero'}
        </button>
      </form>
    </div>
  );
}
