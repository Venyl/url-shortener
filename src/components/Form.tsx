import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { set } from 'zod';

export const Form = () => {
    const [url, setUrl] = useState('');
    const [slug, setSlug] = useState('');
    const [noti, setNoti] = useState('');
    const [colorType, setColorType] = useState('success');

    async function createEntry() {
        const res = await fetch('/api/createEntry', {
            method: 'POST',
            body: JSON.stringify({ url, slug }),
        });
        const status = res.status;
        console.log(status);

        if (status === 200) {
            setColorType('success');
            setNoti(`Success! Your URL: https://url-shortener-venyl.vercel.app/api/${slug}`);
            setSlug('');
            setUrl('');
            return;
        }
        const message = await res.text();
        setColorType('error');
        setNoti(message);
    }

    function handleInput(
        e: FormEvent<HTMLTextAreaElement | HTMLInputElement>,
        setState: Dispatch<SetStateAction<string>>
    ) {
        setState(e.currentTarget.value);
    }

    return (
        <div className="flex flex-col space-y-4 max-w-3xl grow ">
            <div className={`flex justify-center ${!noti && 'invisible'}`}>
                <p className={`px-5 py-2 rounded-md outline outline-1 ${colorType}`}>
                    {noti || '&nbsp;'}
                </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
                <textarea
                    value={url}
                    onInput={e => {
                        handleInput(e, setUrl);
                    }}
                    className="input w-full resize-none"
                    placeholder="https://www.example.com"
                    rows={3}
                />
                <input
                    value={slug}
                    onInput={e => {
                        handleInput(e, setSlug);
                    }}
                    className="input"
                    type="text"
                    placeholder="Shortened URL name"
                />
            </div>
            <button
                onClick={createEntry}
                className="rounded-md outline outline-lime-300 bg-lime-300 w-72 mx-auto py-2 text-3xl font-bold text-main500 hover:bg-main500 hover:text-lime-300"
            >
                Submit
            </button>
        </div>
    );
};
