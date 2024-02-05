  const audioElement = document.getElementById("myAudio");
  const audioSource = document.createElement("source");
  audioSource.src = base64AudioData;
  audioSource.type = "audio/mp3";
  audioElement.appendChild(audioSource);
  
  // Tambahkan event listener ke elemen dokumen
  document.addEventListener("click", function() {
    // Periksa apakah audio sedang dimainkan atau dalam keadaan di-pause
    if (audioElement.paused) {
      audioElement.play();
    }
  });
  
  // Ulangi audio ketika selesai
  audioElement.addEventListener("ended", function() {
    this.currentTime = 0;
    this.play();
  });
  
  function myFunction() {
    var x = document.getElementById("myDIV");
    x.style.display = "none";
  }
  
  function exite() {
    window.location.replace('/');
  }
  
document.addEventListener("DOMContentLoaded", function () {
  const creditsContainer = document.getElementById("creditsContainer");

  // Ambil data dari file JSON
  fetch('credits.json')
    .then(response => response.json())
    .then(data => {
      // Tampilkan data JSON secara terstruktur
      data.forEach(section => {
        const sectionTitle = document.createElement("h2");
        sectionTitle.textContent = section.section;
        creditsContainer.appendChild(sectionTitle);
        section.titles.forEach(title => {
          const titleElement = document.createElement("h3");
          titleElement.textContent = title.title;
          creditsContainer.appendChild(titleElement);
          const namesList = document.createElement("div");
          title.names.forEach(name => {
            const nameItem = document.createElement("div");
            nameItem.innerHTML = name;
            namesList.appendChild(nameItem);
          });
          creditsContainer.appendChild(namesList);
        });
      });
    })
    .catch(error => console.error('Error fetching credits:', error));
});
