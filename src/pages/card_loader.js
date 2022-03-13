import {useState} from 'react';

import CardDisplay from '../components/card_display';

export function CardLoader() {
    const [cardNames, setCardNames] = useState([]);

    const onSubmit = (e) => {
        setCardNames(e.target.value.split('\n').map((s) => s.trim()));
    };

    const onKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            onSubmit(e);
        }
    };

    return (
        <>
            <textarea
                onSubmit={onSubmit}
                onKeyDown={onKeyDown}
                style={{width: 400, height: 300, resize: 'none'}}
            />
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {cardNames
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((line) => {
                        const match = /^(?:(\d+)x?\s+)?(.*)$/.exec(line);
                        const count = match[1] ? parseInt(match[1], 10) : 1;
                        const name = match[2];

                        return <CardDisplay name={name} count={count} />;
                    })}
            </div>
        </>
    );
}
