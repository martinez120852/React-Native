;import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios'
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
  comentarios: state.comentarios,
  excursiones: state.excursiones,
  favoritos: state.favoritos
  }
}
const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId))
})


function RenderComentario(props) {

  const comentarios = props.comentarios;
  
  const renderCommentarioItem = ({item, index}) => {
  
      return (
      <View key={index} style={{margin: 10}}>
        <Text style={{fontSize: 14}}>{item.comentario}</Text>
        <Text style={{fontSize: 12}}>{item.valoracion} Stars</Text>
      <Text style={{fontSize: 12}}>{'-- ' + item.autor + ', ' + item.dia} </Text>
      </View>
      );
  };
 
      return (
        <Card>
          <Card.Title>Comentarios</Card.Title>
          <Card.Divider/>
          <FlatList
          data={comentarios}
          renderItem={renderCommentarioItem}
          keyExtractor={item => item.id.toString()}
          />
        </Card>
      );
}



function RenderExcursion(props) {

    const excursion = props.excursion;
    
        if (excursion != null) {
            return(
            <Card>
              <Card.Title>{excursion.nombre}</Card.Title>
              <Card.Divider/>
              <Card.Image source={{uri: baseUrl + excursion.imagen}}></Card.Image>
              <Text style={{margin: 20}}>
                {excursion.descripcion}
              </Text>
              <Icon
                  raised
                  reverse
                  name={ props.favorita ? 'heart' : 'heart-o'}
                  type='font-awesome'
                  color='#f50'
                  onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
              />
            </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class DetalleExcursion extends Component {
  /*constructor(props) {
      super(props);
      this.state = {
          excursiones: EXCURSIONES,
          comentarios: COMENTARIOS,
          favoritos: []
      };
  }*/

  marcarFavorito(excursionId) {
    //this.setState({favoritos: this.state.favoritos.concat(excursionId)});
    this.props.postFavorito(excursionId)
  }

  render(){
      const {excursionId} = this.props.route.params;
      return(
        <ScrollView>
          <RenderExcursion 
            excursion={this.props.excursiones.excursiones[+excursionId]} 
            favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
            onPress={() => this.marcarFavorito(excursionId)}
          />
          <RenderComentario 
          comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
          />
        </ScrollView>
        
      );
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);