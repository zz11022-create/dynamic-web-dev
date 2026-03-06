const petProfiles = [
    {
      name: "Whiskers",
      type: "Cat",
      description: "A sophisticated feline who appreciates quiet afternoons and window-watching."
    },
    {
      name: "Mochi",
      type: "Cat",
      description: "A sweet and cuddly cat who loves gentle company and cozy spaces."
    },
    {
      name: "Biscuit",
      type: "Cat",
      description: "A playful little explorer who brings energy and curiosity to every room."
    },
    {
      name: "Luna",
      type: "Cat",
      description: "A calm and observant companion who enjoys peaceful routines."
    },
    {
      name: "Peanut",
      type: "Cat",
      description: "A friendly and cheerful cat who quickly warms up to new people."
    }
  ];
  
  let currentMatchedPet = null;
  
  const scenes = [
    {
      title: "First Meeting",
      text: "Your cat peeks at you from behind the door, curious but cautious...",
      actions: [
        { label: "🙌 Gentle approach", mood: "happy", emoji: "😊", color: "#66cb7d" },
        { label: "🍖 Offer treat", mood: "happy", emoji: "😊", color: "#66cb7d" },
        { label: "🧘 Stay still", mood: "calm", emoji: "😌", color: "#7dbdc2" },
        { label: "👋 Energetic hello", mood: "excited", emoji: "🤩", color: "#edc546" }
      ]
    },
    {
      title: "Feeding Time",
      text: "Your cat's tummy rumbles. It's meal time!",
      actions: [
        { label: "🥗 Fresh food", mood: "happy", emoji: "😊", color: "#66cb7d" },
        { label: "🙌 Hand feed", mood: "happy", emoji: "😊", color: "#66cb7d" },
        { label: "🥣 Leave bowl", mood: "calm", emoji: "😌", color: "#7dbdc2" },
        { label: "⏭ Skip meal", mood: "excited", emoji: "🤩", color: "#edc546" }
      ]
    },
    {
      title: "Play Session",
      text: "Your cat is looking at you with playful eyes...",
      actions: [
        { label: "🎾 Play fetch", mood: "excited", emoji: "🤩", color: "#edc546" },
        { label: "🧩 Puzzle toy", mood: "happy", emoji: "😊", color: "#66cb7d" },
        { label: "🤗 Cuddle time", mood: "calm", emoji: "😌", color: "#7dbdc2" },
        { label: "🚪 Give space", mood: "calm", emoji: "😌", color: "#7dbdc2" }
      ]
    },
    {
      title: "Comfort Time",
      text: "Your cat is a little sleepy and wants a cozy moment.",
      actions: [
        { label: "🛏 Soft blanket", mood: "happy", emoji: "😊", color: "#66cb7d" },
        { label: "💤 Let them nap", mood: "calm", emoji: "😌", color: "#7dbdc2" },
        { label: "🎵 Gentle music", mood: "calm", emoji: "😌", color: "#7dbdc2" },
        { label: "📸 Surprise photo", mood: "excited", emoji: "🤩", color: "#edc546" }
      ]
    },
    {
      title: "Grooming Time",
      text: "Your cat is looking a bit scruffy. Time for some grooming?",
      actions: [
        { label: "🪮 Gentle brush", mood: "calm", emoji: "😌", color: "#7dbdc2" },
        { label: "🛁 Bath time", mood: "excited", emoji: "🤩", color: "#edc546" },
        { label: "🧻 Quick wipe", mood: "happy", emoji: "😊", color: "#66cb7d" },
        { label: "✨ Skip it", mood: "happy", emoji: "😊", color: "#66cb7d" }
      ]
    },
    {
      title: "Night Routine",
      text: "The day is ending. How will you say goodnight to your cat?",
      actions: [
        { label: "🌙 Sleep together", mood: "happy", emoji: "😊", color: "#66cb7d" },
        { label: "🧸 Cozy bed", mood: "calm", emoji: "😌", color: "#7dbdc2" },
        { label: "💬 Soft goodbye", mood: "calm", emoji: "😌", color: "#7dbdc2" },
        { label: "🎉 Last play burst", mood: "excited", emoji: "🤩", color: "#edc546" }
      ]
    }
  ];
  
  async function fetchCatImage() {
    try {
      const res = await fetch("/api/cat");
      const data = await res.json();
      return data.image;
    } catch (error) {
      console.log("cat api error:", error);
      return "https://cataas.com/cat?width=300&height=300&t=" + Date.now();
    }
  }
  
  function setImageById(id, imageUrl) {
    const img = document.getElementById(id);
    if (img) {
      img.src = imageUrl;
    }
  }
  
  async function loadLandingPhotos() {
    const ids = ["landingPet1", "landingPet2", "landingPet3"];
  
    for (let i = 0; i < ids.length; i++) {
      try {
        const imgUrl = "https://cataas.com/cat?width=150&height=150&t=" + Date.now() + "_" + i;
        setImageById(ids[i], imgUrl);
      } catch (error) {
        console.log("landing image error:", error);
      }
    }
  }
  
  async function ensureMainPetImage() {
    let petImage = sessionStorage.getItem("petImage");
  
    if (!petImage) {
      petImage = await fetchCatImage();
      sessionStorage.setItem("petImage", petImage);
    }
  
    const matchImg = document.getElementById("matchPetPhoto");
    const gameImg = document.getElementById("gamePetPhoto");
    const resultImg = document.getElementById("resultPetPhoto");
  
    if (matchImg) matchImg.src = petImage;
    if (gameImg) gameImg.src = petImage;
    if (resultImg) resultImg.src = petImage;
  }
  
  async function updateMatchedPet() {
    const randomIndex = Math.floor(Math.random() * petProfiles.length);
    const pet = petProfiles[randomIndex];
    const newImage = await fetchCatImage();
  
    currentMatchedPet = {
      name: pet.name,
      type: pet.type,
      description: pet.description,
      image: newImage
    };
  
    const petNameEl = document.querySelector(".pet-name");
    const petTypeEl = document.querySelector(".pet-type");
    const petDescriptionEl = document.querySelector(".pet-description");
    const petImageEl = document.getElementById("matchPetPhoto");
  
    if (petNameEl) petNameEl.innerText = currentMatchedPet.name;
    if (petTypeEl) petTypeEl.innerText = currentMatchedPet.type;
    if (petDescriptionEl) petDescriptionEl.innerText = currentMatchedPet.description;
    if (petImageEl) petImageEl.src = currentMatchedPet.image;
  }
  
  function updateSliderValue(sliderId, textId) {
    const slider = document.getElementById(sliderId);
    const text = document.getElementById(textId);
  
    if (slider && text) {
      text.innerText = slider.value + "/5";
  
      slider.addEventListener("input", async () => {
        text.innerText = slider.value + "/5";
        await updateMatchScore();
      });
    }
  }
  
  async function updateMatchScore() {
    const energy = Number(document.getElementById("energy").value);
    const noise = Number(document.getElementById("noise").value);
    const social = Number(document.getElementById("social").value);
    const cuddle = Number(document.getElementById("cuddle").value);
  
    let score =
      100
      - Math.abs(energy - 2) * 6
      - Math.abs(noise - 2) * 5
      - Math.abs(social - 3) * 4
      - Math.abs(cuddle - 4) * 5;
  
    const apartment = document.getElementById("apartment");
    const firstTime = document.getElementById("firstTime");
    const home = document.getElementById("home");
  
    if (apartment && apartment.checked) score += 2;
    if (firstTime && firstTime.checked) score += 2;
    if (home && home.checked) score += 2;
  
    if (score > 99) score = 99;
    if (score < 70) score = 70;
  
    const badge = document.getElementById("matchScore");
    if (badge) {
      badge.innerText = score + "% match";
    }
  
    sessionStorage.setItem("compatibility", score);
  
    await updateMatchedPet();
  }
  
  async function initMatchPage() {
    updateSliderValue("energy", "energyValue");
    updateSliderValue("noise", "noiseValue");
    updateSliderValue("social", "socialValue");
    updateSliderValue("cuddle", "cuddleValue");
  
    ["apartment", "firstTime", "home"].forEach(id => {
      const box = document.getElementById(id);
      if (box) {
        box.addEventListener("change", async () => {
          await updateMatchScore();
        });
      }
    });
  
    await updateMatchScore();
  
    const meetBtn = document.getElementById("meetBtn");
    if (meetBtn) {
      meetBtn.addEventListener("click", () => {
        if (currentMatchedPet) {
          sessionStorage.setItem("petName", currentMatchedPet.name);
          sessionStorage.setItem("petType", currentMatchedPet.type);
          sessionStorage.setItem("petDescription", currentMatchedPet.description);
          sessionStorage.setItem("petImage", currentMatchedPet.image);
        }
  
        sessionStorage.setItem("gameData", JSON.stringify([]));
        sessionStorage.setItem("currentRound", "0");
        sessionStorage.setItem("savedSession", "false");
  
        window.location.href = "game.html";
      });
    }
  }
  
  function createMoodTile(item) {
    const tile = document.createElement("div");
    tile.className = "mood-tile";
    tile.style.background = item.color;
    tile.textContent = item.emoji;
    return tile;
  }
  
  function renderMoodMap(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
  
    container.innerHTML = "";
  
    const gameData = JSON.parse(sessionStorage.getItem("gameData")) || [];
  
    gameData.forEach(item => {
      container.appendChild(createMoodTile(item));
    });
  }
  
  function renderGameRound(roundIndex) {
    const scene = scenes[roundIndex];
    if (!scene) return;
  
    const roundText = document.getElementById("roundText");
    const sceneTitle = document.getElementById("sceneTitle");
    const sceneText = document.getElementById("sceneText");
    const progressFill = document.getElementById("progressFill");
    const actionsGrid = document.getElementById("actionsGrid");
    const gameName = document.querySelector(".game-card .pet-name");
  
    if (roundText) {
      roundText.innerText = `Round ${roundIndex + 1} of ${scenes.length}`;
    }
  
    if (sceneTitle) {
      sceneTitle.innerText = scene.title;
    }
  
    if (sceneText) {
      sceneText.innerText = scene.text;
    }
  
    if (progressFill) {
      progressFill.style.width = `${((roundIndex + 1) / scenes.length) * 100}%`;
    }
  
    const petName = sessionStorage.getItem("petName") || "Whiskers";
    if (gameName) {
      gameName.innerText = petName;
    }
  
    if (actionsGrid) {
      actionsGrid.innerHTML = "";
  
      scene.actions.forEach(action => {
        const btn = document.createElement("button");
        btn.className = "action-btn";
        btn.textContent = action.label;
        btn.addEventListener("click", () => handleAction(action));
        actionsGrid.appendChild(btn);
      });
    }
  
    renderMoodMap("moodMap");
  }
  
  function handleAction(action) {
    const gameData = JSON.parse(sessionStorage.getItem("gameData")) || [];
    gameData.push(action);
    sessionStorage.setItem("gameData", JSON.stringify(gameData));
  
    let currentRound = Number(sessionStorage.getItem("currentRound")) || 0;
    currentRound++;
    sessionStorage.setItem("currentRound", currentRound);
  
    if (currentRound >= scenes.length) {
      window.location.href = "result.html";
    } else {
      renderGameRound(currentRound);
    }
  }
  
  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  
  async function saveSession(score, petName, gameData) {
    const alreadySaved = sessionStorage.getItem("savedSession");
    if (alreadySaved === "true") return;
  
    const session = {
      pet: petName,
      compatibility: score,
      moods: gameData
    };
  
    try {
      await fetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(session)
      });
  
      sessionStorage.setItem("savedSession", "true");
    } catch (error) {
      console.log("save session error:", error);
    }
  }
  
  function buildResultPage() {
    const score = sessionStorage.getItem("compatibility") || "79";
    const petName = sessionStorage.getItem("petName") || "Whiskers";
    const petType = sessionStorage.getItem("petType") || "Cat";
    const petDescription = sessionStorage.getItem("petDescription") || "";
    const gameData = JSON.parse(sessionStorage.getItem("gameData")) || [];
  
    const finalScore = document.getElementById("finalScore");
    const resultName = document.querySelector(".result-card .pet-name");
    const resultType = document.querySelector(".result-card .pet-type");
    const resultDescription = document.querySelector(".result-card .pet-description");
  
    if (finalScore) finalScore.innerText = score + "%";
    if (resultName) resultName.innerText = petName;
    if (resultType) resultType.innerText = petType;
    if (resultDescription) resultDescription.innerText = petDescription;
  
    renderMoodMap("resultMoodMap");
  
    const moodTags = document.getElementById("moodTags");
    const careList = document.getElementById("careList");
    const summaryText = document.getElementById("summaryText");
  
    const moodCount = {};
  
    if (careList) {
      careList.innerHTML = "";
  
      gameData.forEach((item, index) => {
        moodCount[item.mood] = (moodCount[item.mood] || 0) + 1;
  
        const p = document.createElement("p");
        p.innerText = `Round ${index + 1}: ${item.label} → ${item.emoji} ${capitalize(item.mood)}`;
        careList.appendChild(p);
      });
    }
  
    if (moodTags) {
      moodTags.innerHTML = "";
  
      Object.keys(moodCount).forEach(key => {
        const tag = document.createElement("div");
        tag.className = "mood-tag";
        tag.innerText = `${capitalize(key)} × ${moodCount[key]}`;
        moodTags.appendChild(tag);
      });
    }
  
    if (summaryText) {
      if ((moodCount.happy || 0) >= 3) {
        summaryText.innerText =
          "You brought so much joy to your matched cat! Your caring nature shines through.";
      } else if ((moodCount.calm || 0) >= 3) {
        summaryText.innerText =
          "You created a peaceful and comforting environment. Your cat felt safe with you.";
      } else {
        summaryText.innerText =
          "You and your cat had an energetic day together, full of stimulation and surprise.";
      }
    }
  
    saveSession(score, petName, gameData);
  }
  
  async function initPage() {
    const page = document.body.dataset.page;
  
    if (page === "index") {
      try {
        await loadLandingPhotos();
      } catch (error) {
        console.log("landing photos error:", error);
      }
    }
  
    if (page === "match") {
      try {
        await ensureMainPetImage();
      } catch (error) {
        console.log("match image error:", error);
      }
      await initMatchPage();
    }
  
    if (page === "game") {
      try {
        await ensureMainPetImage();
      } catch (error) {
        console.log("game image error:", error);
      }
  
      const currentRound = Number(sessionStorage.getItem("currentRound")) || 0;
      renderGameRound(currentRound);
    }
  
    if (page === "result") {
      try {
        await ensureMainPetImage();
      } catch (error) {
        console.log("result image error:", error);
      }
      buildResultPage();
    }
  }
  
  window.onload = initPage;