<div id="focusTracker">
  <p>🎯 Focus Time: <span id="focusMinutes">0</span> minutes</p>
</div>

<script>
let minutes = 0;
setInterval(() => {
  minutes++;
  document.getElementById("focusMinutes").textContent = minutes;
}, 60000); // Every minute
</script>

