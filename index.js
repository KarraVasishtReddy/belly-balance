<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BellyBalance Web</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; text-align: center; padding: 20px; background-color: #f4f9f4; color: #333; }
        h1 { color: #2e7d32; }
        .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin-bottom: 20px; text-align: left; }
        .btn { background: #2e7d32; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; width: 100%; margin-top: 10px; }
        .btn:hover { background: #1b5e20; }
        #status { margin-top: 15px; font-weight: bold; color: #d32f2f; }
        
        /* Hiding the default file input to use our custom button */
        input[type="file"] { display: none; }
    </style>
</head>
<body>

    <h1>🍍 BellyBalance</h1>
    <p>Snap your food, balance your gut.</p>

    <div class="card">
        <h3>1. Log Your Meal</h3>
        <p>Take a picture of your plate. We'll tell you if you need a digestion boost.</p>
        
        <label for="cameraInput" class="btn" style="display: inline-block; text-align: center; box-sizing: border-box;">
            📸 Snap Food Photo
        </label>
        <input type="file" id="cameraInput" accept="image/*" capture="environment">
        
        <p id="status"></p>
    </div>

    <div class="card">
        <h3>2. Digestion Relief Hub</h3>
        <ul style="line-height: 1.8;">
            <li><strong>🧘 Vajrasana (Thunderbolt Pose):</strong> Sit on your heels right after eating to boost stomach blood flow.</li>
            <li><strong>✋ ST36 Acupressure:</strong> Massage the point 4 fingers below your kneecap to relieve bloating.</li>
            <li><strong>🧘 Pawanmuktasana:</strong> Lie on your back and hug your knees to your chest to release gas.</li>
        </ul>
    </div>

    <script>
        // Request Notification Permission when the app loads
        if ("Notification" in window) {
            Notification.requestPermission();
        }

        const cameraInput = document.getElementById('cameraInput');
        const statusText = document.getElementById('status');

        // Listen for when the user takes a photo
        cameraInput.addEventListener('change', function(event) {
            if (event.target.files.length > 0) {
                statusText.innerText = "Analyzing food image... 🔍";
                statusText.style.color = "#f57c00";

                // MOCK AI LOGIC: Simulate network delay, then pretend it found fried food
                setTimeout(() => {
                    statusText.innerText = "⚠️ Heavy/Fried food detected! Notification scheduled.";
                    statusText.style.color = "#d32f2f";
                    scheduleFruitReminder();
                }, 2000);
            }
        });

        function scheduleFruitReminder() {
            // For testing purposes, we trigger the notification after 5 seconds instead of 45 minutes
            setTimeout(() => {
                if (Notification.permission === "granted") {
                    new Notification("Time for a Fruit Fix! 🍍", {
                        body: "Your body is working hard on those fats. Grab some papaya or pineapple to help digest!",
                        icon: "https://cdn-icons-png.flaticon.com/512/3137/3137044.png" 
                    });
                } else {
                    alert("🍍 Time for a Fruit Fix! Grab some papaya or pineapple.");
                }
            }, 5000); // Change 5000 (5 sec) to 2700000 for a real 45-minute delay
        }
    </script>

</body>
</html>
