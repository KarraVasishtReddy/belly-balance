// 1. Load the model from your GitHub repository
let model;
async function loadModel() {
    console.log("Loading model...");
    // Point this to the folder you uploaded to GitHub
    model = await tf.loadLayersModel('./web_model/model.json'); 
    console.log("Model loaded successfully!");
}

// Call this function when the page loads
loadModel();

// 2. Function to analyze the food image when the user snaps a photo
async function analyzeFood(imageElement) {
  <input type="file" accept="image/*" capture="environment" id="cameraInput">
<img id="foodPreview" style="display:none;" />
<div id="result"></div>

<script>
document.getElementById('cameraInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const imgElement = document.getElementById('foodPreview');
        imgElement.src = URL.createObjectURL(file);
        
        // Wait for the image to load on screen, then analyze it
        imgElement.onload = () => {
            document.getElementById('result').innerHTML = "⚙️ Analyzing food profile...";
            analyzeFood(imgElement); 
        }
    }
});
</script>
    if (!model) {
        alert("Model is still loading, please wait a second.");
        return;
    }

    // Convert the HTML image element into a format the model understands (a Tensor)
    let tensor = tf.browser.fromPixels(imageElement)
        .resizeNearestNeighbor([224, 224]) // Resize to whatever your model was trained on
        .toFloat()
        .expandDims(); // Add batch dimension

    // Normalize the image (if you normalized during training, e.g., dividing by 255)
    tensor = tensor.div(255.0);

    // 3. Run the prediction
    const prediction = await model.predict(tensor).data();
    
    // Assuming prediction[0] is the probability of a "Heavy/Fatty" meal
    const heavyMealProbability = prediction[0];

    displayRecommendation(heavyMealProbability);
}

// 4. Map the model's math to your UI logic
function displayRecommendation(probability) {
    const resultDiv = document.getElementById('result'); // Your UI container

    if (probability > 0.7) { // 70% confidence it's heavy
        resultDiv.innerHTML = `
            <h3>⚠️ Heavy Meal Detected!</h3>
            <p>Your body is processing high amounts of fat.</p>
            <p><strong>Action:</strong> Eat a slice of Papaya or Pineapple in 30 minutes. Their natural enzymes (papain and bromelain) will break down these complex lipids.</p>
        `;
    } else {
        resultDiv.innerHTML = `
            <h3>✅ Balanced Meal!</h3>
            <p>Looks like a light, easily digestible meal. Great job!</p>
        `;
    }
}
