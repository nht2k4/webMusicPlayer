// Truy cập vào các thành phần
const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Tiêu đề bài hát, tương ứng với các file mp3
const songs = ["day_bien", "sao_troi_lam_gio","mac_van_quy_ky", "xuan_dinh_tuyet", "cuu_mon_hoi_uc(remix)", "lanterns"];
let songIndex = 2;

// Load 1 bài hát theo index
loadSong(songs[songIndex]);

// Cập nhật thông tin bài hát
function loadSong(song) {
    title.innerText = song;
    audio.src = `${song}.mp3`;
    cover.src = `${song}.jpg`;
}

// Play song
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");

    audio.pause();
}

// Xử lý khi prev bài hát
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Lắng nghe sự kiện
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Hàm tìm kiếm bài hát trong cơ sở dữ liệu
// ... (Code trước đó)

// Hàm tìm kiếm bài hát trong cơ sở dữ liệu
// Thay đổi hàm findSong như sau
// Sửa hàm findSong
// Sửa hàm findSong
// Sửa hàm findSong
function findSong(query) {
    const matchedSong = songs.find(song => song.toLowerCase() === query.toLowerCase());

    if (matchedSong) {
        return { name: matchedSong, mp3: `${matchedSong}.mp3` };
    }

    const partialMatch = songs.find(song => song.toLowerCase().includes(query.toLowerCase()));

    return partialMatch ? { name: partialMatch, mp3: `${partialMatch}.mp3` } : null;
}

// Sự kiện submit của form
document.getElementById('musicSearchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var searchQuery = document.getElementById('searchQuery').value;
    var result = findSong(searchQuery);

    if (result) {
        // Nếu tìm thấy bài hát, cập nhật đường dẫn và phát
        loadSong(result.name);
        playSong();
        showSongInfo(result.name);
    } else {
        // Nếu không tìm thấy, hiển thị thông báo hoặc xử lý khác
        displaySearchResults('No results found for: ' + searchQuery);
    }
});



// ... (Code sau đó)


//Thêm mã JavaScript để cập nhật lời bài hát dựa trên sự kiện timeupdate của thẻ <audio>.
// Lấy thẻ div chứa lời bài hát
const lyricsContainer = document.getElementById("lyrics");

// Hàm cập nhật lời bài hát dựa trên thời gian hiện tại của bài hát
function updateLyricsScroll() {
    const currentTime = audio.currentTime;
    const currentSong = "sao_troi_lam_gio"; // Thay "song1" bằng tên bài hát hiện tại

    // Tìm dòng lời bài hát tương ứng với thời gian hiện tại
    const lyricsLines = findLyricsLinesByTime(currentTime, currentSong);

    // Hiển thị lời bài hát trong lyricsContainer
    lyricsContainer.innerHTML = lyricsLines.join("<br>");

    // Cuộn lên đến dòng hiện tại nếu có nhiều hơn chiều cao tối đa của khu vực
    if (lyricsContainer.scrollHeight > lyricsContainer.clientHeight) {
        lyricsContainer.scrollTop = lyricsContainer.scrollHeight;
    }
}

const lyricsData = {
    "sao_troi_lam_gio": {
        lyrics: [
            { time: 0, text: "Khuya đã khuyên hơn rồi" },
            { time: 35, text: "Ngủ sớm đi em mai làm cô dâu" },
            // ...
        ]
    },
    "song2": {
        lyrics: [
            { time: 0, text: "Dòng 1: Lời bài hát dòng 1 cho bài hát 2" },
            { time: 10, text: "Dòng 2: Lời bài hát dòng 2 cho bài hát 2" },
            // ...
        ]
    },
    // Thêm các bài hát khác nếu cần
};

// Hàm tìm dòng lời bài hát tương ứng với thời gian hiện tại
function findLyricsLinesByTime(currentTime, currentSong) {
    const currentLyrics = lyricsData[currentSong];

    if (currentLyrics) {
        const lyricsLines = currentLyrics.lyrics.filter(line => line.time <= currentTime && (line.time + 10) >= currentTime);
        return lyricsLines.length > 0 ? lyricsLines.map(line => line.text) : [""]; // Trả về một dòng trống nếu không có lời nào tương ứng
    } else {
        return [""]; // Trả về một dòng trống nếu không có lời nào tương ứng
    }
}

function updateProgress(e) {
    updateLyricsScroll();
    // Rest of your updateProgress function
}




// Lắng nghe sự kiện thời gian thay đổi của bài hát
audio.addEventListener("timeupdate", updateLyricsScroll);





prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);


// ... (Code trước đó)

// Hiển thị thông tin bài hát khi tìm kiếm
function showSongInfo(song) {
    songInfoImage.src = `${song}.jpg`;
    songTitleElement.textContent = "Tên bài hát: " + song;
    songArtistElement.innerHTML = "Ca sĩ: " + getArtistInfo(song);
    songInfoContainer.style.display = "block";
}

function hideSongInfo() {
    songInfoContainer.style.display = "none";
}

// Thay đổi thanh thời lượng có màu tím
function updateProgressBarColor() {
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`;
    progress.style.backgroundColor = `rgb(128, 0, 128)`; // Màu tím
}

// Hiển thị lời bài hát trong khung bo tròn hồng nhạt
function updateLyricsScroll() {
    const currentTime = audio.currentTime;
    const currentSong = "song1"; // Thay "song1" bằng tên bài hát hiện tại

    // Tìm dòng lời bài hát tương ứng với thời gian hiện tại
    const lyricsLines = findLyricsLinesByTime(currentTime, currentSong);

    // Hiển thị lời bài hát trong lyricsContainer
    lyricsContainer.innerHTML = lyricsLines.join("<br>");

    // Cuộn lên đến dòng hiện tại nếu có nhiều hơn chiều cao tối đa của khu vực
    if (lyricsContainer.scrollHeight > lyricsContainer.clientHeight) {
        lyricsContainer.scrollTop = lyricsContainer.scrollHeight;
    }
}

// Lắng nghe sự kiện thời gian thay đổi của bài hát
audio.addEventListener("timeupdate", function (e) {
    updateProgressBarColor();
    updateLyricsScroll();
});

// Lắng nghe sự kiện kết thúc bài hát để hiển thị thông tin bài hát tiếp theo
audio.addEventListener("ended", function () {
    const nextSong = songs[songIndex];
    showSongInfo(nextSong);
});

// Hàm tìm kiếm bài hát trong cơ sở dữ liệu
function findSong(query) {
    return songs.find(song => song.toLowerCase().includes(query.toLowerCase()));
}
//tìm kiếm bài hát - rồi phát nó
// ... (Code trước đó)

// Hiển thị thông tin bài hát khi tìm kiếm
// ... (Code trước đó)

// Hiển thị thông tin bài hát khi tìm kiếm
function showSongInfo(song) {
    const songInfo = getSongInfo(song);
    
    songInfoImage.src = `images/${song}.jpg`;
    songTitleElement.textContent = "Tên bài hát: " + songInfo.title;
    songArtistElement.innerHTML = "Ca sĩ: " + songInfo.artist;
    songInfoContainer.style.display = "block";
}

function getSongInfo(song) {
    // Dùng một cơ sở dữ liệu ảo cho tên và ca sĩ
    const songDatabase = {
        "day_bien": { title: "Đáy biển", artist: "Chưa biết" },
        "sao_troi_lam_gio": { title: "Sao trời làm gió", artist: "Út Nhị" },
        // Thêm các bài hát khác nếu cần
    };

    return songDatabase[song] || { title: "Không rõ", artist: "Không rõ" };
}

function hideSongInfo() {
    songInfoContainer.style.display = "none";
}

// ... (Code sau đó)


// Thay đổi thanh thời lượng có màu tím
function updateProgressBarColor() {
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`;
    progress.style.backgroundColor = `rgb(128, 0, 128)`; // Màu tím
}

// Hiển thị lời bài hát trong khung bo tròn hồng nhạt
function updateLyricsScroll() {
    const currentTime = audio.currentTime;
    const currentSong = "song1"; // Thay "song1" bằng tên bài hát hiện tại

    // Tìm dòng lời bài hát tương ứng với thời gian hiện tại
    const lyricsLines = findLyricsLinesByTime(currentTime, currentSong);

    // Hiển thị lời bài hát trong lyricsContainer
    lyricsContainer.innerHTML = lyricsLines.join("<br>");

    // Cuộn lên đến dòng hiện tại nếu có nhiều hơn chiều cao tối đa của khu vực
    if (lyricsContainer.scrollHeight > lyricsContainer.clientHeight) {
        lyricsContainer.scrollTop = lyricsContainer.scrollHeight;
    }
}

// Lắng nghe sự kiện thời gian thay đổi của bài hát
audio.addEventListener("timeupdate", function (e) {
    updateProgressBarColor();
    updateLyricsScroll();
});

// Lắng nghe sự kiện kết thúc bài hát để hiển thị thông tin bài hát tiếp theo
audio.addEventListener("ended", function () {
    const nextSong = songs[songIndex];
    showSongInfo(nextSong);
});

// Hàm tìm kiếm bài hát trong cơ sở dữ liệu
function findSong(query) {
    return songs.find(song => song.toLowerCase().includes(query.toLowerCase()));
}

document.getElementById('musicSearchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var searchQuery = document.getElementById('searchQuery').value;
    var result = findSong(searchQuery);

    if (result) {
        // Nếu tìm thấy bài hát, tự động phát
        playSong(result);
        showSongInfo(result);
    } else {
        // Nếu không tìm thấy, hiển thị thông báo hoặc xử lý khácA
        displaySearchResults('No results found for: ' + searchQuery);
    }
});
