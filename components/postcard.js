import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export default function PostCard({ post }) {
    const { t } = useTranslation();
    const [publishing, setPublishing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    // Publish post
    const publishPost = async (postId) => {
        // change publishing state
        setPublishing(true);

        try {
            // Update post
            await fetch('/api/posts', {
                method: 'PUT',
                body: postId,
            });

            // reset the publishing state
            setPublishing(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // Stop publishing state
            return setPublishing(false);
        }
    };
    // Delete post
    const deletePost = async (postId) => {
        //change deleting state
        setDeleting(true);

        try {
            // Delete post
            await fetch('/api/posts', {
                method: 'DELETE',
                body: postId,
            });

            // reset the deleting state
            setDeleting(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // stop deleting state
            return setDeleting(false);
        }
    };
    return (
        <>
        <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
            <div className="flex justify-center md:justify-end -mt-16">
                <li>
                    <h3><b>{t('CONTACT.TITLE')}</b> {post.title}</h3>
                    <p><b>{t('CONTACT.CONTENT')}</b> {post.content}</p>
                    <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                    <div className="flex justify-end mt-4">
                        {!post.published ? (
                            <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                            type="button" onClick={() => publishPost(post._id)}>
                            {publishing ? t('POST.PUBLISHING') : t('POST.PUBLISH')}
                            </button>
                        ) : null}
                        <button className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded"
                        style={{marginLeft: 10}} type="button" onClick={() => deletePost(post['_id'])}>
                            {deleting ? t('POST.DELETING') : t('POST.DELETE')}
                        </button>
                    </div>
                </li>
            </div>
        </div>
        </>
    );
}