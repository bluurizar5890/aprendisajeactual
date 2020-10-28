import React, { useEffect, useLayoutEffect } from 'react'
import '../assets/styles/components/Player.scss';
import { connect } from 'react-redux';
import { getVideoSource } from '../actions';
import { Redirect } from 'react-router-dom';
import NotFound from '../containers/NotFound';
const Player = (props) => {
    const { id } = props.match.params;

    const hasPlaying = Object.keys(props.playing).length > 0;

    // useEffect(() => {
    //     props.getVideoSource(id);
    // }, []);

    useLayoutEffect(() => {
        props.getVideoSource(id);
    }, [])
    return hasPlaying ? (
        <div className="Player">
            <video controls autoPlay>
                <source src={props.playing.source} type="video/mp4" />
            </video>
            <div className="Player-back">
                <button type="button" onClick={() => props.history.push('/')}>Regresar</button>
            </div>
        </div>
    ) : <NotFound />
}

const mapDispatchToProps = {
    getVideoSource
}

const mapStateToProps = state => {
    return {
        playing: state.playing
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Player);
