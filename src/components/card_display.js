import {useCard} from '../hooks';

export default function CardDisplay(props) {
    const card = useCard(props.name);

    const count = (
        <div
            style={{
                color: 'white',
                backgroundColor: 'rgba(40, 40, 40, 0.7)',
                position: 'absolute',
                width: 20,
                height: 20,
            }}
        >
            {props.count ?? '0'}
        </div>
    );

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

    return (
        <div style={{width: 150, height: 225, padding: 5}}>
            {count}
            {content}
        </div>
    );
}
