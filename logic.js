if(window.location.host === 'courses.wesbos.com' && document.querySelector('.course-viewer')){
  fetch(chrome.extension.getURL('/popup.html'))
    .then(response => response.text())
    .then(data => {
        
        document.body.innerHTML = data + document.body.innerHTML;
        
        const durations = document.querySelectorAll(".duration");
        const completedVideos = document.querySelectorAll('.completed .duration');
        const percentComplete = Math.floor((completedVideos.length / durations.length) * 100);
        
        const totalHours = Math.round((calculateTotalMinutes(durations)/ 60) * 100) / 100
        const completedHours = Math.round((calculateTotalMinutes(completedVideos)/ 60) * 100) / 100
        
        document.querySelector('#courseCount').innerText = `${completedVideos.length}/${durations.length} lessons`;
        document.querySelector('#courseDuration').innerText = `${completedHours}/${totalHours} hours`;
        document.querySelector('.course--overview--container__progress').style.width = `${percentComplete}%`;
    })
    .catch(err => {
        // handle error
    });
}

function calculateTotalMinutes(containers) {
  return Array.from(containers).map(item => {
    let ms = item.innerHTML;
    let timeSplit = ms.split(':');
      
    let seconds = (parseFloat(timeSplit[0]) * 60) + parseFloat(timeSplit[1]);
    return Math.floor((seconds / 60));
  }).reduce((acc, current) => acc + current);
}