import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

export default function AntioxidantTracker() {
  const [hasPermission, setHasPermission] = Camera.useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);

  // STEP 1: Capture the Image
  const takePicture = async () => {
    if (cameraRef.current) {
      setLoading(true);
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      
      // Pass the photo to our recognition function
      identifyFood(photo.base64);
    }
  };

  // STEP 2: Identify the Food (Simulating a Vision API)
  const identifyFood = async (base64Image) => {
    try {
      /* * In a real app, you would send the base64Image to Google Cloud Vision 
       * or OpenAI Vision API here. 
       * const response = await fetch('YOUR_VISION_API_URL', { body: base64Image... })
       */
      
      // Simulating an API response that detected French Fries
      const detectedFood = { 
        name: "French Fries", 
        preparationMethod: "fried" 
      };
      
      calculateOxidantScore(detectedFood);
    } catch (error) {
      Alert.alert("Error", "Could not identify food.");
      setLoading(false);
    }
  };

  // STEP 3: Calculate Oxidant Score & Check Deficit
  const calculateOxidantScore = (foodItem) => {
    let oxidantScore = 0;

    // Basic logic: if it's fried, it has a high oxidative load
    if (foodItem.preparationMethod === "fried") {
      oxidantScore = 85; 
    } else {
      oxidantScore = 10; // e.g., steamed veggies
    }

    if (oxidantScore > 50) {
      fetchBalancingFoods(foodItem.name);
    } else {
      setLoading(false);
      Alert.alert("Great Choice!", "This meal is balanced and low in oxidants.");
    }
  };

  // STEP 4: Fetch Recommendations & Send Alert
  const fetchBalancingFoods = (foodName) => {
    /* * Here you would query your Supabase database for high ORAC 
     * (Oxygen Radical Absorbance Capacity) foods.
     */
    const recommendations = ["Blueberries", "Green Tea", "Kiwi"];
    
    setLoading(false);
    
    // Trigger the UI Alert to the user
    Alert.alert(
      "Oxidative Load Detected ⚠️",
      `You just had ${foodName}! To neutralize oxidative stress and balance your stomach, try having a side of ${recommendations[0]} or a cup of ${recommendations[1]} soon.`,
      [{ text: "Got it!" }]
    );
  };

  // --- UI Render ---
  if (!hasPermission?.granted) {
    return <Text style={styles.text}>Requesting camera permission...</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={CameraType.back} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.text}> Analyze Meal </Text>
            )}
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 10,
  },
  text: { fontSize: 24, fontWeight: 'bold', color: 'white' },
});
