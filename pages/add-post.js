import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Nav from '../components-old/Nav';
import styles from '../styles/Home.module.css';

const AddPost = () => {
    const { t, i18n } = useTranslation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const classes = {
        submitBtn:'bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4 border-b-4 border-pink-700 hover:border-pink-500 rounded'
    };

    const handlePost = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!title || !content) return setError('All fields are required');

        // post structure
        let post = {
            title,
            content,
            published: false,
            createdAt: new Date().toISOString(),
        };
        // save the post
        let response = await fetch('/api/cards', {
            method: 'POST',
            body: JSON.stringify(post),
        });

        // get the data
        let data = await response.json();
        console.log('data', data);

        if (data.success) {
            // reset the fields
            setTitle('');
            setContent('');
            // set the message
            return setMessage(data.message);
        } else {
            // set the error
            return setError(data.message);
        }
    };

    return (
        <div>
            <Nav/>
            <div className={styles.container}>
                <form onSubmit={handlePost} className={styles.form}>
                    {error ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.error}>{error}</h3>
                        </div>
                    ) : null}
                    {message ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.message}>{message}</h3>
                        </div>
                    ) : null}
                    <div className={styles.formItem}>
                        <label>{t('CONTACT.TITLE')}</label>
                        <input
                            type="text"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder={t('COMMON.PLACEHOLDER')}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label>{t('CONTACT.CONTENT')}</label>
                        <textarea
                            name="content"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder={t('COMMON.PLACEHOLDER')}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <button className={classes.submitBtn}
                        type="submit">{t('CONTACT.SUBMIT')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddPost;