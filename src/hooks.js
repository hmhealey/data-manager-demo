import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useCard(name) {
    const dispatch = useDispatch();

    const card = useSelector((state) => state.cardsByName[name]);

    useEffect(() => {
        if (!card) {
            dispatch({type: 'FETCH_CARD', name: name});
        }
    }, [dispatch, card, name]);

    return card;
}
