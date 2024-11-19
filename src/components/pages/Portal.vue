<template>
  <!-- Flexbox-Container -->
  <div class="flex-container">
    <div class="location" id="lc1">Location 1</div>
    <div class="location" id="lc2">Location 2</div>
    <div class="location" id="lc3">Location 3</div>
  </div>

  <!-- Zweiter Flexbox-Container mit Buttons -->
  <div class="flex-container">
    <div class="location-empty" id="lc1"></div>
    <div class="location" id="lc2">
      <h1></h1>
      <button class="navigationButton" id="btn1">Last</button>
      <button class="navigationButton" id="btn2">Next</button>
    </div>
    <div class="location-empty" id="lc3"></div>
  </div>

  <!-- Inhalt wird via teleport verschoben -->
  <div id="tele">
    <p>Initialer Text in lc3</p>
  </div>

  <!--    <teleport to="#tele">-->
  <!--      <p>Hallo von Teleport</p>-->
  <!--    </teleport>-->
</template>
<script setup lang="ts"></script>

<style>
/* Container Flexbox */
.flex-container {
  display: flex;
  flex-direction: row; /* Anordnung der Kinder nebeneinander */
  justify-content: space-around; /* Platzierung mit Abstand dazwischen */
  align-items: center; /* Zentrierung auf der vertikalen Achse */
  padding: 20px;
  background-color: #f0f0f0;
  /* height: 100vh; */
}

/* Styles für jedes Child-Element */
.location {
  background-color: #4caf50;
  color: white;
  padding: 20px;
  text-align: center;
  flex: 1;
  margin: 10px;
}

.location-empty {
  background-color: #f0f0f0;
  color: white;
  padding: 20px;
  text-align: center;
  flex: 1;
  margin: 10px;
}

.navigationButton {
  background-color: #4cacaf;
  color: white;
  text-align: center;
  margin-right: 10px;
  width: 100px;
  height: 35px;
}
</style>
