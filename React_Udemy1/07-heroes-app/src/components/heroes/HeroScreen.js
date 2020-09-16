import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroeById } from '../../selectors/getHeroeById';

export const HeroScreen = ({history}) => {

    const { heroeId } = useParams();

    const hero=useMemo(() =>getHeroeById(heroeId), [heroeId]);
    if (!hero) {
        return <Redirect to="/" />
    }

    const handleReturn=()=>{
        if(history.length<=2){
            history.push("/");
        }else{
            history.goBack(); //Para regresar a la pagina anterior
        }
    }
    const { superhero, publisher, alter_ego, first_appearance, characters } = hero;
    return (
        <div className="row mt-5">
            <div className="col-4">
                <img
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                    src={`../assets/heroes/${heroeId}.jpg`} alt={superhero}
                />
            </div>
            <div className="col-8 animate__animated animate__fadeIn">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego:</b>{alter_ego}</li>
                    <li className="list-group-item"><b>Publiser:</b>{publisher}</li>
                    <li className="list-group-item"><b>First appearance:</b>{first_appearance}</li>
                </ul>
                <h5>Characters</h5>
                <p>
                    {characters}
                </p>
                <button 
                    onClick={handleReturn}
                    className="btn btn-outline-info">
                    Return
                </button>
            </div>
        </div>
    )
}
