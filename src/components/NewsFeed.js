import React, { PropTypes, Component } from 'react'; 
import { 
  ListView, 
  StyleSheet, 
  View, 
  Modal,
  TouchableOpacity,
  WebView 
} from 'react-native'; 
import * as globalStyles from '../styles/global'; 
 
export default class NewsFeed extends Component { 
 
  constructor(props) { 
    super(props); 
    this.ds = new ListView.DataSource({ 
      rowHasChanged: (row1, row2) => row1.title !== row2.title 
    }); 
    this.state = { 
      dataSource: this.ds.cloneWithRows(props.news),
      modalVisible: false
    }; 
    this.onModalOpen = this.onModalOpen.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.renderRow = this.renderRow.bind(this);
  } 
 
  renderModal() { 
  return ( 
    <Modal 
      animationType="slide" 
      visible={this.state.modalVisible} 
      onRequestClose={this.onModalClose} 
    > 
      <View style={styles.modalContent}> 
        <TouchableOpacity 
          onPress={this.onModalClose} 
          style={styles.closeButton} 
        > 
          <SmallText>Close</SmallText> 
        </TouchableOpacity> 
        <WebView
         scalesPageToFit
         source={{uri: this.state.modalUrl}} /> 
      </View> 
    </Modal> 
  ); 
}  
 
  renderRow(rowData, ...rest) { 
    const index = parseInt(rest[1], 10); 
    return ( 
      <NewsItem
        onPress = {()=> this.onModalOpen(rowData.url)} 
        style={styles.newsItem} 
        index={index} 
        {...rowData} 
      /> 
    ); 
  }

  onModalOpen(url){
      this.setState({
          modalVisible: true,
          modalUrl: url
      });
  } 

  onModalClose(){
      this.setState({
          modalVisible: false
      });
  }
 
  render() { 
    return ( 
      <View style={globalStyles.COMMON_STYLES.pageContainer}> 
        <ListView 
          enableEmptySections 
          dataSource={this.state.dataSource} 
          renderRow={this.renderRow} 
          style={this.props.listStyles} 
        /> 
        {this.renderModal()} 
      </View> 
    ); 
  } 
 
}

const styles = StyleSheet.create({ 
  newsItem: { 
    marginBottom: 20 
  }, 
  modalContent: { 
    flex: 1, 
    justifyContent: 'center', 
    paddingTop: 20, 
    backgroundColor: globalStyles.BG_COLOR 
  }, 
  closeButton: { 
    paddingVertical: 5, 
    paddingHorizontal: 10, 
    flexDirection: 'row' 
  } 
});  