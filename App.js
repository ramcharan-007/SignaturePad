import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Modal } from 'react-native';
import { Path, Svg } from 'react-native-svg';

const { height, width } = Dimensions.get('window');

export default function App() {
  const [path, setPath] = useState([]);
  const [savedImage, setSavedImage] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [isClearButtonClicked, setIsClearButtonClicked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onTouchEnd = () => {
    setPath(prevPath => [...prevPath, currentPath]);
    setCurrentPath([]);
    setIsClearButtonClicked(false);
  };

  const onTouchMove = (event) => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;

    const newPoint = `${currentPath.length === 0 ? 'M' : 'L'}${locationX.toFixed(0)},${locationY.toFixed(0)}`;
    setCurrentPath(prevPath => [...prevPath, newPoint]);
  };

  const handleClearButtonClicked = () => {
    setPath([]);
    setCurrentPath([]);
    setIsClearButtonClicked(true);
  };

  const handleSaveButton = () => {
    setSavedImage(path);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.svgContainer} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <Svg>
          <Path 
            d={path.flat().join('')}
            stroke={isClearButtonClicked ? 'transparent' : 'red'}
            fill={'transparent'}
            strokeWidth={3}
            strokeLinejoin={'round'}
            strokeLinecap={'round'}
          />
        </Svg>
      </View>
      <View>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleSaveButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleClearButtonClicked}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <Svg>
            <Path
              d={savedImage.flat().join('')}
              stroke="red"
              fill="transparent"
              strokeWidth={3}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </Svg>
          <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgContainer: {
    height: height * 0.7,
    width: width - 40,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonStyle: {
    margin: 10,
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
