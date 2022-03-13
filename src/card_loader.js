import {useState} from 'react';

import {useCard} from './hooks';

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
                style={{width: 600, height: 400}}
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

function CardDisplay(props) {
    const card = useCard(props.name);

    let content;
    if (card) {
        content = (
            <img
                alt={props.name}
                src={card.image_uris.normal}
                style={{width: 'inherit'}}
            />
        );
    } else {
        content = props.name;
    }

    return <div style={{width: 150, height: 225, padding: 5}}>{content}</div>;
}
