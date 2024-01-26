// This will use the demo backend if you open index.html locally via file://, otherwise your server will be used

responsiveVoice.enableEstimationTimeout = false;
let isReading = false;
         function docDuLieu(duLieu) {
            
        if (isReading) {
            // Nếu đang đọc, chờ đến khi đọc hiện tại hoàn tất trước khi bắt đầu đọc văn bản mới
            setTimeout(function () {
                docDuLieu(duLieu);
            }, 100);
        } else {
            responsiveVoice.speak(duLieu, 'Vietnamese FeMale', {
                onstart: function () {
                    isReading = true;
                },
                onend: function () {
                    isReading = false;
                }
            });
        }
    }

let backendUrl = location.protocol === 'file:' ? "https://tiktok-chat-reader.zerody.one/" : undefined;
let connection = new TikTokIOConnection(backendUrl);

// Counter
let viewerCount = 0;
let likeCount = 0;
let diamondsCount = 0;

// These settings are defined by obs.html
if (!window.settings) window.settings = {};

$(document).ready(() => {
$('#connectButton').click(connect);
$('#uniqueIdInput').on('keyup', function (e) {
    if (e.key === 'Enter') {
        connect();
    }
});

if (window.settings.username) connect();
})

function connect() {
let uniqueId = window.settings.username || $('#uniqueIdInput').val();
if (uniqueId !== '') {

    $('#stateText').text('Connecting...');

    connection.connect(uniqueId, {
        enableExtendedGiftInfo: true
    }).then(state => {
        $('#stateText').text(`Đã Kết Nối Đến Phòng Live Số : ${state.roomId}`);
        
        // reset stats
        viewerCount = 0;
        likeCount = 0;
        diamondsCount = 0;
        updateRoomStats();

    }).catch(errorMessage => {
        $('#stateText').text(errorMessage);

        // schedule next try if obs username set
        if (window.settings.username) {
            setTimeout(() => {
                connect(window.settings.username);
                
            }, 30000);
        }
    })

} else {
    alert('no username entered');
}
}

// Prevent Cross site scripting (XSS)
function sanitize(text) {
return text.replace(/</g, '&lt;')
}

function updateRoomStats() {
$('#roomStats').html(`Viewers: <b>${viewerCount.toLocaleString()}</b> Likes: <b>${likeCount.toLocaleString()}</b> Earned Diamonds: <b>${diamondsCount.toLocaleString()}</b>`)
}

function generateUsernameLink(data) {
return `<a class="usernamelink" href="https://www.tiktok.com/@${data.uniqueId}" target="_blank">${data.nickname}</a>`;
}

function isPendingStreak(data) {
return data.giftType === 1 && !data.repeatEnd;
}

/**
* Add a new message to the chat container
*/
function addChatItem(color, data, text, summarize) {
let container = location.href.includes('obs.html') ? $('.eventcontainer') : $('.chatcontainer');

if (container.find('div').length > 500) {
    container.find('div').slice(0, 200).remove();
}

container.find('.temporary').remove();;

container.append(`
    <div class=${summarize ? 'temporary' : 'static'}>
        <img class="miniprofilepicture" src="${data.profilePictureUrl}">
        <span>
            <b>${generateUsernameLink(data)}:</b> 
            <span style="color:${color}">${sanitize(text)}</span>
        </span>
    </div>
`);

container.stop();
container.animate({
    scrollTop: container[0].scrollHeight
}, 400);
}

/**
* Add a new gift to the gift container
*/
function addGiftItem(data) {
let container = location.href.includes('obs.html') ? $('.eventcontainer') : $('.giftcontainer');

if (container.find('div').length > 200) {
    container.find('div').slice(0, 100).remove();
}

let streakId = data.userId.toString() + '_' + data.giftId;

let html = `
    <div data-streakid=${isPendingStreak(data) ? streakId : ''}>
        <img class="miniprofilepicture" src="${data.profilePictureUrl}">
        <span>
            <b>${generateUsernameLink(data)}:</b> <span>${data.describe}</span><br>
            <div>
                <table>
                    <tr>
                        <td><img class="gifticon" src="${data.giftPictureUrl}"></td>
                        <td>
                            <span>Name: <b>${data.giftName}</b> (ID:${data.giftId})<span><br>
                            <span>Repeat: <b style="${isPendingStreak(data) ? 'color:red' : ''}">x${data.repeatCount.toLocaleString()}</b><span><br>
                            <span>Cost: <b>${(data.diamondCount * data.repeatCount).toLocaleString()} Diamonds</b><span>
                        </td>
                    </tr>
                </tabl>
            </div>
        </span>
    </div>
`;

let existingStreakItem = container.find(`[data-streakid='${streakId}']`);

if (existingStreakItem.length) {
    existingStreakItem.replaceWith(html);
} else {
    container.append(html);
}

container.stop();
container.animate({
    scrollTop: container[0].scrollHeight
}, 800);
}


// viewer stats
connection.on('roomUser', (msg) => {
if (typeof msg.viewerCount === 'number') {
    viewerCount = msg.viewerCount;
    updateRoomStats();
}
})

// like stats
connection.on('like', (msg) => {
if (typeof msg.totalLikeCount === 'number') {
    likeCount = msg.totalLikeCount;
    updateRoomStats();
}

if (window.settings.showLikes === "0") return;

if (typeof msg.likeCount === 'number') {
    addChatItem('#447dd4', msg, msg.label.replace('{0:user}', '').replace('likes', `${msg.likeCount} likes`))
}
})

// Member join
let joinMsgDelay = 0;
connection.on('member', (msg) => {
if (window.settings.showJoins === "0") return;

let addDelay = 250;
if (joinMsgDelay > 500) addDelay = 100;
if (joinMsgDelay > 1000) addDelay = 0;

joinMsgDelay += addDelay;

setTimeout(() => {
    joinMsgDelay -= addDelay;
    addChatItem('#21b2c2', msg, 'joined', true);

    
                docxinchao = msg.nickname;
                addNewMarquee(docxinchao);
          

}, joinMsgDelay);
})

// New chat comment received
connection.on('chat', (msg) => {
if (window.settings.showChats === "0") return;

addChatItem('', msg, msg.comment);
var checkbox = document.getElementById('checkbox1');
            
            if (checkbox.checked) {
                if (msg.comment.charAt(0) === '@') {
        
                    dulieu =msg.nickname+"nói với" + msg.comment.slice(1);
                   docDuLieu(dulieu);
                } else {
                   dulieu =msg.nickname+" nói "+msg.comment;
                   docDuLieu(dulieu);
                }
            }

           
    
})

// New gift received
connection.on('gift', (data) => {
if (!isPendingStreak(data) && data.diamondCount > 0) {
    diamondsCount += (data.diamondCount * data.repeatCount);
    updateRoomStats();
}

if (window.settings.showGifts === "0") return;

addGiftItem(data);

noidung = data.nickname+" đã gửi "+tenqua(data.giftId);
docDuLieu(noidung);
goinhac(data.giftId);
           

})

// share, follow
connection.on('social', (data) => {
if (window.settings.showFollows === "0") return;

let color = data.displayType.includes('follow') ? '#ff005e' : '#2fb816';
addChatItem(color, data, data.label.replace('{0:user}', ''));
docfl= "cảm ơn "+data.nickname+" đã follow";
docDuLieu(docfl);

})

connection.on('streamEnd', () => {
$('#stateText').text('Stream ended.');

// schedule next try if obs username set
if (window.settings.username) {
    setTimeout(() => {
        connect(window.settings.username);
    }, 30000);
}
})

function goinhac(mason){

    if (mason === 5655) {
        loadImage('hinhanh/1.gif', 'amthanh/audition/1.mp3');
    } else if (mason === 5269) {
        loadImage('hinhanh/2.gif', 'amthanh/audition/2.mp3');
    } else if (mason === 5827) {
        loadImage('hinhanh/3.gif', 'amthanh/audition/3.mp3');
    } else if (mason === 5487) {
        loadImage('hinhanh/4.gif', 'amthanh/audition/4.mp3');
    } else if (mason === 6064) {
        loadImage('hinhanh/5.gif', 'amthanh/audition/5.mp3');
    }else  {
        loadImage('hinhanh/5.gif', 'amthanh/audition/5.mp3');
    }
}

function tenqua(maso){

    if (maso === 333) {
        return "Đội tuyển tuyệt vời";
    } else if (maso === 8202) {
        return "Đội tuyển xuất sắc";
    } else if (maso === 7831) {
        return "Biểu tượng Hòa bình Ngoài hành tinh";
    } else if (maso === 7934) {
        return "Tim thành Viên";
    } else if (maso === 6470) {
        return "Tháng Năm";
    } else if (maso === 8201) {
        return "Chúng tôi là một đội";
    } else if (maso === 7375) {
        return "Chú lợn may mắn";
    } else if (maso === 7213) {
        return "Con sóc";
    } else if (maso === 6652) {
        return "Tia chớp";
    } else if (maso === 6784) {
        return "Lát bánh";
    } else if (maso === 6788) {
        return "Cây đèn sáng";
    } else if (maso === 7002) {
        return "Người lùn vườn";
    } else if (maso === 6649) {
        return "Đưa hết";
    } else if (maso === 6890) {
        return "Yêu bạn";
    } else if (maso === 6635) {
        return "Búa sấm";
    } else if (maso === 6447) {
        return "Hoa cúc";
    } else if (maso === 6247) {
        return "Trái tim";
    } else if (maso === 6246) {
        return "Nút Like";
    } else if (maso === 5760) {
        return "Tạ";
    } else if (maso === 5655) {
        return "hoa Hồng";
    } else if (maso === 5269) {
        return "TikTok";
    } else if (maso === 8205) {
        return "Đội số 1";
    } else if (maso === 8352) {
        return "Vỏ bông Cotton";
    } else if (maso === 5487) {
        return "bắn tim";
    } else if (maso === 8243) {
        return "Động viên bạn";
    } else if (maso === 8165) {
        return "Gà con";
    } else if (maso === 8189) {
        return "Maxwell";
    } else if (maso === 7591) {
        return "Tiny Diny";
    } else if (maso === 8108) {
        return "Xương chó";
    } else if (maso === 6249) {
        return "Quả bóng bầu dục Rugby";
    } else if (maso === 8448) {
        return "Racoon";
    } else if (maso === 5658) {
        return "Nước hoa";
    } else if (maso === 8217) {
        return "Capybara";
    } else if (maso === 6471) {
        return "Chào tháng Năm";
    } else if (maso === 8155) {
        return "Yêu thích của tôi";
    } else if (maso === 8130) {
        return "Like-Pop";
    }
    else if (maso === 6627) {
        return "Mũ Bucket";
    } else if (maso === 7092) {
        return "Đàn guitar";
    } else if (maso === 6432) {
        return "Ngôi sao";
    } else if (maso === 6427) {
        return "Mũ và râu";
    } else if (maso === 6097) {
        return "Vương miện nhỏ";
    } else if (maso === 6104) {
        return "Nón";
    } else if (maso === 5659) {
        return "Chim giấy";
    } else if (maso === 7121) {
        return "Pháo hoa tuyệt vời";
    } else if (maso === 6968) {
        return "Trái tim tay";
    } else if (maso === 6960) {
        return "Bộ điều khiển trò chơi";
    } else if (maso === 5585) {
        return "Pháo hoa";
    } else if (maso === 5660) {
        return "Trái tim trong bàn tay";
    } else if (maso === 5729) {
        return "Bướm";
    } else if (maso === 7824) {
        return "Hồn đam mê";
    } else if (maso === 8066) {
        return "Kính bảo hộ";
    } else if (maso === 7927) {
        return "Tình yêu của chó con";
    } else if (maso === 6776) {
        return "Kính sinh nhật";
    } else if (maso === 6713) {
        return "Động viên cho bạn";
    } else if (maso === 6671) {
        return "Yêu bạn";
    } else if (maso === 6437) {
        return "Đèn đường hoa";
    } else if (maso === 5880) {
        return "Khóa và chìa khóa";
    } else if (maso === 5586) {
        return "Thơm má";
    } else if (maso === 5509) {
        return "Kính râm";
    } else if (maso === 6757) {
        return "Nhanh chóng";
    } else if (maso === 8111) {
        return "Siêu năng lực";
    } else if (maso === 6265) {
        return "Vịt";
    } else if (maso === 6267) {
        return "Chó Corgi";
    } else if (maso === 6007) {
        return "Găng tay đấm bốc";
    } else if (maso === 5882) {
        return "Rock 'n' Roll";
    } else if (maso === 8349) {
        return "Cotton the Seal";
    } else if (maso === 8327) {
        return "Chuyến bay hoa";
    } else if (maso === 7895) {
        return "Mặt nạ Gamer Cyber";
    } else if (maso === 5899) {
        return "Đu";
    } else if (maso === 8244) {
        return "Đôi bàn tay nâng lên";
    } else if (maso === 6415) {
        return "Âm nhạc";
    } else if (maso === 5731) {
        return "San hô";
    }
    else if (maso === 8232) {
        return "Làm vườn";
    } else if (maso === 8074) {
        return "Ôm chặt với tôi";
    } else if (maso === 7282) {
        return "Hôn môi Spaghetti";
    } else if (maso === 7168) {
        return "Súng tiền";
    } else if (maso === 7122) {
        return "Súng đá quý";
    } else if (maso === 7357) {
        return "Cúp TikTok";
    } else if (maso === 5897) {
        return "Thiên nga";
    } else if (maso === 5978) {
        return "Tàu hỏa";
    } else if (maso === 6233) {
        return "Du lịch cùng bạn";
    } else if (maso === 7123) {
        return "Bóng bay sáng bóng";
    } else if (maso === 6781) {
        return "Tình yêu dưa hấu";
    } else if (maso === 5680) {
        return "Quả cầu nhảy múa";
    } else if (maso === 5587) {
        return "Mỏ vàng";
    } else if (maso === 7963) {
        return "Cây kim cương";
    } else if (maso === 6090) {
        return "Pháo hoa";
    } else if (maso === 7624) {
        return "Đi chơi xe";
    } else if (maso === 7984) {
        return "Đếm cừu";
    } else if (maso === 7367) {
        return "Nhẫn kim cương";
    } else if (maso === 7467) {
        return "Đuổi đuổi ước mơ";
    } else if (maso === 5955) {
        return "Nhà vô địch";
    } else if (maso === 5651) {
        return "Đèn đường";
    } else if (maso === 8245) {
        return "Chúng ta bắt đầu";
    } else if (maso === 8277) {
        return "Giọt tình yêu";
    } else if (maso === 6327) {
        return "Khí trụ";
    } else if (maso === 7529) {
        return "Pháo hoa bí ẩn";
    } else if (maso === 6797) {
        return "Bánh siêu";
    } else if (maso === 6789) {
        return "Thảm đỏ";
    } else if (maso === 6862) {
        return "Cooper về nhà bằng máy bay";
    } else if (maso === 6834) {
        return "Hộp quà";
    } else if (maso === 6033) {
        return "Hộp trang điểm";
    } else if (maso === 6381) {
        return "Hòm điện thoại";
    } else if (maso === 6820) {
        return "Lặn của cá voi";
    } else if (maso === 8038) {
        return "Vấn đề gấp đôi";
    } else if (maso === 5765) {
        return "Xe máy";
    } else if (maso === 8188) {
        return "Vũ điệu của Gấu Nhảy";
    } else if (maso === 6563) {
        return "Mưa sao băng";
    }else  if (maso === 5652) {
        return "Vòng xoay Ferris";
    } else if (maso === 8152) {
        return "Tàu xuân";
    } else if (maso === 6835) {
        return "Hộp quà";
    } else if (maso === 6148) {
        return "Tràn ngập hoa";
    } else if (maso === 7124) {
        return "Máy bay ký tên";
    } else if (maso === 6646) {
        return "Leon con";
    } else if (maso === 5767) {
        return "Máy bay riêng tư";
    } else if (maso === 8415) {
        return "Hạ gục";
    } else if (maso === 7482) {
        return "Máy bay phản lực";
    } else if (maso === 6922) {
        return "Elephant Ellie";
    } else if (maso === 7468) {
        return "Adam nhảy múa";
    } else if (maso === 6719) {
        return "Nhà ở biển";
    } else if (maso === 6864) {
        return "Nhà của Cooper";
    } else if (maso === 8247) {
        return "Bữa tiệc vui vẻ";
    } else if (maso === 6787) {
        return "Bữa tiệc sinh nhật";
    } else if (maso === 6790) {
        return "Thời gian ăn mừng";
    } else if (maso === 6089) {
        return "Xe thể thao";
    } else if (maso === 8420) {
        return "Ngôi sao ngai vàng";
    } else if (maso === 8104) {
        return "Xe tải quái vật";
    } else if (maso === 7764) {
        return "Ngôi sao ngai vàng";
    } else if (maso === 8417) {
        return "Bạch tuộc";
    } else if (maso === 6203) {
        return "Đường đua hoàng hôn";
    } else if (maso === 6149) {
        return "Ngoại hành tinh";
    } else if (maso === 8419) {
        return "Chớp đèn đỏ";
    } else if (maso === 7730) {
        return "Hoàng tử ếch";
    } else if (maso === 6892) {
        return "Xe đua";
    } else if (maso === 6588) {
        return "Tàu vũ trụ";
    } else if (maso === 8416) {
        return "Kim tự tháp";
    } else if (maso === 8418) {
        return "Siêu tốc";
    } else if (maso === 6662) {
        return "Quang cảnh lâu đài";
    } else if (maso === 5954) {
        return "Hành tinh";
    } else if (maso === 8248) {
        return "Bay cùng tình yêu";
    } else if (maso === 7125) {
        return "Tàu con thoi cao cấp";
    } else if (maso === 6751) {
        return "Tàu con thoi TikTok";
    } else if (maso === 7987) {
        return "Chim đại bàng";
    } else if (maso === 7400) {
        return "Giấc mơ của Adam";
    } else if (maso === 7319) {
        return "Phượng hoàng";
    } else if (maso === 7610) {
        return "Hỏa long";
    } else if (maso === 6369) {
        return "Sư tử";
    } else if (maso === 8391) {
        return "Sam cá voi";
    } else if (maso === 8457) {
        return "Zeus";
    } else if (maso === 7823) {
        return "Leon và Sư tử";
    } else if (maso === 8381) {
        return "Hải cẩu và cá voi";
    } else if (maso === 7312) {
        return "Vũ trụ TikTok+";
    } else if (maso === 6038) {
        return "Vũ trụ TikTok";5660
    }
    else if (maso === 9072) {
        return "tiktok u ni vơ";
    }else if (maso === 8913) {
        return "Hoa hồng Rosa";
    }
    else if (maso === 8825) {
        return "Heo Quay";
    }
    else if (maso === 6766) {
        return "Bó hoa";
    }
    else if (maso === 9500) {
        return "Máy bay phản lực ";
    }
    else if (maso === 6055) {
        return "Tim hồng ";
    }
    else if (maso === 9334) {
        return "Live fast ";
    }
    else if (maso === 9139) {
        return "Vòng Tay Đội ";
    }
    else if (maso === 5827) {
        return "cây kem ";
    }
    else if (maso === 7412) {
        return "bing chi ling ";
    }
    else if (maso === 5879) {
        return "Bánh Vòng ";
    }

    

}

// Mặc định hiển thị video khi trang được tải
$(document).ready(function() {
    var defaultVideoId = 'wIWKA2S8rKc';
    var defaultPlayerHtml = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + defaultVideoId + '" frameborder="0" allowfullscreen></iframe>';
    $('#player').html(defaultPlayerHtml);
});

function searchAndPlay() {
    var apiKey = 'AIzaSyBs5HQe2QUo8vUq-jJOgJrFv1EQx1j8m_4';
    var searchQuery = $('#search_query').val();
    var searchType = $('#search_type').val();

    $.get(
        'https://www.googleapis.com/youtube/v3/search', {
            part: 'snippet',
            q: searchQuery,
            type: searchType,
            key: apiKey
        },
        function (data) {
            if (data.items.length > 0) {
                var videoId = data.items[0].id.videoId;
                var playerHtml = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>';
                $('#player').html(playerHtml);

                displaySearchResults(data.items);
            } else {
                $('#result_list').html('<li>No results found.</li>');
            }
        }
    );
}

function displaySearchResults(results) {
    var resultList = $('#result_list');
    resultList.empty();

    results.forEach(function (result) {
        var resultItem = $('<li class="result-item"></li>');
        var thumbnailUrl = result.snippet.thumbnails.medium.url;

        // Hiển thị hình ảnh bìa video
        var thumbnailImg = $('<img src="' + thumbnailUrl + '" alt="Video Thumbnail">');
        resultItem.append(thumbnailImg);

        resultItem.click(function() {
            var selectedVideoId = result.id.videoId;
            var playerHtml = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + selectedVideoId + '" frameborder="0" allowfullscreen></iframe>';
            $('#player').html(playerHtml);
        });

        resultList.append(resultItem);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    var audio = new Audio();
    var toggleBtns = document.querySelectorAll('.toggle-btn');
    var currentPlayingBtn = null;
  
    toggleBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var audioSrc = this.getAttribute('data-src');
        toggleAudio(this, audioSrc);
      });
    });
  
    audio.addEventListener('loadedmetadata', function() {
      // Set the duration based on the loaded metadata
      audioDuration = audio.duration;
    });
  
    audio.addEventListener('ended', function() {
      // Reset the player when the audio ends
      resetPlayer();
    });
  
    function toggleAudio(btn, src) {
      if (currentPlayingBtn === btn) {
        // If the same button is clicked again, toggle between play and pause
        if (audio.paused) {
          audio.play();
          btn.innerHTML = '&#9724;'; // Change button icon to pause
        } else {
          audio.pause();
          btn.innerHTML = '&#9654;'; // Change button icon to play
        }
      } else {
        // Pause the currently playing button (if any)
        if (currentPlayingBtn) {
          currentPlayingBtn.innerHTML = '&#9654;';
        }
  
        // Play the audio of the clicked button
        audio.src = src;
        audio.play();
        btn.innerHTML = '&#9724;'; // Change button icon to pause
        currentPlayingBtn = btn;
      }
    }
  
    function resetPlayer() {
      audio.currentTime = 0; // Set the playback position to the beginning
      if (currentPlayingBtn) {
        currentPlayingBtn.innerHTML = '&#9654;';
        currentPlayingBtn = null;
      }
    }
  });
  
  var functionQueue = []; // Hàng chờ hàm và thời điểm gọi
  var isProcessingQueue = false; // Biến kiểm tra xem hàng chờ đang được xử lý hay không

  function loadImage(imageLink, audioLink) {
      var imageUrl = imageLink;
      var audioUrl = audioLink;
      var audio = document.getElementById("audio");

      // Thêm hàm vào hàng chờ
      functionQueue.push({
          func: function() {
              resetImageAndPlayAudio(imageUrl, audioUrl);
          },
          timestamp: Date.now()
      });

      // Nếu hàng chờ đang được xử lý, không thực hiện thêm
      if (!isProcessingQueue) {
          processQueue();
      }
  }

  function resetImageAndPlayAudio(imageUrl, audioUrl) {
      var imageContainer = document.getElementById("imageContainer");
      var loadedImage = document.getElementById("loadedImage");
      var audio = document.getElementById("audio");

      // Stop and reset audio
      audio.pause();
      audio.currentTime = 0;

      loadedImage.src = imageUrl;

      // Reset kích thước ảnh nếu ảnh vượt quá kích thước khung
      loadedImage.onload = function () {
          if (loadedImage.width > imageContainer.clientWidth || loadedImage.height > imageContainer.clientHeight) {
              loadedImage.style.maxWidth = "100%";
              loadedImage.style.maxHeight = "100%";
          }
      };

      // Play audio
      if (audioUrl) {
          audio.src = audioUrl;
          audio.play();
      }
  }

  function processQueue() {
      isProcessingQueue = true;

      // Lấy hàm và thời điểm gọi gần nhất từ hàng chờ
      var nextFunctionInfo = functionQueue.shift();

      // Thực hiện hàm
      nextFunctionInfo.func();

      // Dừng sau 30 giây trước khi tiếp tục xử lý hàm tiếp theo trong hàng chờ
      setTimeout(function () {
          isProcessingQueue = false;

          // Kiểm tra xem có hàm nào khác trong hàng chờ không, nếu có thì tiếp tục xử lý
          if (functionQueue.length > 0) {
              processQueue();
          }
      }, 30000);
  }
  //------------------------------thử nghiệm gửi cmt-------------------

