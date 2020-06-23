import React from 'react';


import api from '../api';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import BadgeDetails from './BadgeDetails';


class BadgeDetailsContainer extends React.Component{
        state={
            loading:true,
            error:null,
            data:undefined,
            modalIsOpen:false
        };

        componentDidMount(){
            this.fechData();
        }
        fechData=async()=>{
            this.setState({loading:true,error:null});

            try{
                const data=await api.badges.read(this.props.match.params.badgeId);
                this.setState({loading:false,error:null,data:data});
            }catch(error){
                this.setState({loading:false,error:error});
            }
        }

        handleOpenModal=e=>{
            this.setState({modalIsOpen:true});
        }
        handleCloseModal=e=>{
            this.setState({modalIsOpen:false});
        }
        render(){
            if(this.state.loading){
                return <PageLoading/>
            }
            if(this.state.error){
                return <PageError error={this.state.error}/>
            }
            
            return(
            <BadgeDetails badge={this.state.data} onCloseModal={this.handleCloseModal} onOpenModal={this.handleOpenModal} modalIsOpen={this.state.modalIsOpen}/>
            );
        }
}
export default BadgeDetailsContainer