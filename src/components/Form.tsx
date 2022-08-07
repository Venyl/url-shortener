import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

export const Form = () => {
    const [url, setUrl] = useState('');
    const [slug, setSlug] = useState('');
    const [error, setError] = useState('');

    async function createEntry() {
        const res = await fetch('/api/createEntry', {
            method: 'POST',
            body: JSON.stringify({ url, slug }),
        });
        const status = res.status;
        console.log(status);

        if (status === 200) {
            setError('');
            return;
        }
        const message = await res.text();
        setError(message);
    }

    function handleInput(
        e: FormEvent<HTMLTextAreaElement | HTMLInputElement>,
        setState: Dispatch<SetStateAction<string>>
    ) {
        setState(e.currentTarget.value);
    }

    return (
        <div className="flex flex-col space-y-4 max-w-3xl grow ">
            <div className={`flex justify-center ${!error && 'invisible'}`}>
                <p className="bg-red-200 text-red-700 px-5 py-2 rounded-md outline outline-1 outline-red-800">
                    {error}
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
