/**
 * 1. render song --> ok
 * 2. scroll --> ok
 * 3. play / pause / seek --> ok
 * 4. CD rotate --> ok
 * 5. next / prev --> ok
 * 6. Active song --> ok
 * 7. scroll active song into view --> ok
 * 8. play song when click --> ok
 * 9. add more kind of song
 * 10. download features
 */

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const singerName = $('header h3')
const cdThumb = $('.cd-thumb')
const audio = $('#audio ')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')
const muteBtn = $('.btn-volume')
const volumeBtn = $('#volume')
const optionBtn = $('.option')
const optionBox = $('.option-box')
const downloadBtn = $('.option-box_download')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMuted: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        // {
        //     name: 'Do For Love',
        //     singer: 'B-RAY x AMEE',
        //     path: './assets/music/song1.mp3',
        //     img: './assets/img/song1.jpg'
        // },
        // {
        //     name: 'BẠC PHẬN',
        //     singer: 'JACK x KICM',
        //     path: './assets/music/song2.mp3',
        //     img: './assets/img/song2.jpg'
        // },
        // {
        //     name: 'Anh nhà ở đâu thế',
        //     singer: 'B-RAY x AMEE',
        //     path: './assets/music/song3.mp3',
        //     img: './assets/img/song3.jpg'
        // },
        // {
        //     name: 'Đã lỡ yêu em nhiều',
        //     singer: 'JustaTee',
        //     path: './assets/music/song4.mp3',
        //     img: './assets/img/song4.jpg'
        // },
        // {
        //     name: 'Con trai cưng của mẹ',
        //     singer: 'B-RAY',
        //     path: './assets/music/song5.mp3',
        //     img: './assets/img/song5.jpg'
        // },
        // {
        //     name: '2 Phút hơn',
        //     singer: 'PHÁO',
        //     path: './assets/music/song6.mp3',
        //     img: './assets/img/song6.jpg'
        // },
        // {
        //     name: 'Tình bạn diệu kỳ',
        //     singer: 'AMEE x Ricky Star x Lăng LD',
        //     path: './assets/music/song7.mp3',
        //     img: './assets/img/song7.jpg'
        // },
        // {
        //     name: 'Ái Nộ',
        //     singer: 'Khôi Vũ',
        //     path: './assets/music/song8.mp3',
        //     img: './assets/img/song8.jpg'
        // },
        // {
        //     name: 'Túy Âm',
        //     singer: 'Xesi x Masew x NhatNguyen',
        //     path: './assets/music/song9.mp3',
        //     img: './assets/img/song9.jpg'
        // },
        {
            name: 'Sài Gòn Hôm Nay Mưa 1967 remix',
            singer: 'JSOL x Hoàng Duyên',
            path: './assets/music/Sai-Gon-Hom-Nay-Mua-Remix-Hoang-Duyen-ft-JSOL-1967-Remix.mp3',
            img: './assets/img/song10.jpg'
        },
        {
            name: 'Sinh Ra Đã Là Thứ Đối Lập Nhau',
            singer: 'Emcee L(Da LAB) x Badbies',
            path: './assets/music/SinhRaDaLaThuDoiLapNhau-EmceeLDaLABBadbies-6896982.mp3',
            img: './assets/img/song11.jpg'
        },
        {
            name: 'Nhắn Tới Khoảng Trời Em',
            singer: 'Quân A.P',
            path: './assets/music/Nhan Toi Khoang Troi Em - Quan A_P.mp3',
            img: './assets/img/song13.jpg'
        },
        {
            name: 'Chúng Ta Sau Này',
            singer: 'T.R.I',
            path: './assets/music/ChungTaSauNay-TRI-6929586.mp3',
            img: './assets/img/song14.jpg'
        },
        {
            name: '3107',
            singer: 'W/n x Duongg x Nâu',
            path: './assets/music/3107-WnDuonggNau-6099150.mp3',
            img: './assets/img/song20.jpg'
        },
        {
            name: '3107 - 2',
            singer: 'W/n x Duongg x Nâu',
            path: './assets/music/31072-DuonggNauWn-6937818.mp3',
            img: './assets/img/song21.jpg'
        },
        {
            name: '3107 - 3',
            singer: 'W/N x Duongg x Nâu x Titie',
            path: './assets/music/31073-WnDuonggNauTitie-7058449.mp3',
            img: './assets/img/song12.jpg'
        },
        {
            name: 'LoneLy Love',
            singer: 'Trang Hàn x Hoàng Thông x TDK',
            path: './assets/music/LonelyLove-TrangHanHoangThongTDK-5649019.mp3',
            img: './assets/img/song15.jpg'
        },
        {
            name: 'Bước Qua Nhau',
            singer: 'Vũ.',
            path: './assets/music/BuocQuaNhau-Vu-7120388.mp3',
            img: './assets/img/song16.jpg'
        },
        {
            name: 'take some rest',
            singer: 'middmoon',
            path: './assets/music/middmoon-rooftop-420.mp3',
            img: './assets/img/song17.jpg'
        },
        {
            name: 'Real Love - The Heroes Version',
            singer: 'My Anh x Khắc Hưng',
            path: './assets/music/Real Love The Heroes_ - My Anh_ Khac Hun.mp3',
            img: './assets/img/song18.jpg'
        },
        {
            name: 'Con Trai Cưng',
            singer: 'B Ray',
            path: './assets/music/Con Trai Cung - B Ray_ Masew.mp3',
            img: './assets/img/song19.jpg'
        },
    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.img}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option ${index === this.currentIndex ? 'active' : ''}" data-index="${index}" data-path="${song.path}">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },
    definedProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvent: function() {
        const _this = this
        const cdWidth = cd.offsetWidth

        // xử lý cd quay
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 15000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // xử lý phóng to / thu nhỏ cd
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // xử lý khi click play button
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // khi chạy nhạc
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        // khi dừng nhạc
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        // khi tùy chỉnh âm lượng bài hát
        volumeBtn.value = 100 // giá trị mặc định
        volumeBtn.oninput = function(e) {
            audio.volume = e.target.value/100;
        }
        

        // khi mute bài hát
        muteBtn.onclick = function() {
            _this.isMuted = !_this.isMuted
            // _this.setConfig('isMuted', _this.isMuted)
            muteBtn.classList.toggle('active', _this.isMuted)

            audio.muted = _this.isMuted
            // _this.setConfig('isMuted', _this.isMuted)
        }
        

        // xử lý khi tua bài hát
        progress.oninput = function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        // khi next bài hát
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.randomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // khi prev bài hát
        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.randomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // khi random bài hát
        randomBtn.onclick = function(e) { // mặc định isRandom = false

            _this.isRandom = !_this.isRandom
            // randomBtn.classList.remove('active', _this.isRandom);
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)

            _this.isRepeat = false;
            repeatBtn.classList.remove('active')
            _this.setConfig('isRepeat', _this.isRepeat)
        }

        // khi repeat bài hát / sử dụng loop property
        repeatBtn.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat
            // repeatBtn.classList.toggle('active', _this.isRepeat)
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)

            _this.isRandom = false;
            randomBtn.classList.remove('active')
            _this.setConfig('isRandom', _this.isRandom)
        }
        
        // xử lý khi ended bài hát
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // khi tắt option-box
        optionBox.onclick = function(e) {
            // ngày mai xử lý nốt nhé 
            // const downNode = e.target.closest('.option-box_download')
            // const FavNode = e.target.closest('.option-box_favorite')

            // // if(downNode) {
            //     
            // // }
            // // if(FavNode) {
            // //     // code
            // // }
            optionBox.style.inset = 'unset'
        }

        // lắng nghe hành vi click  vào playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            const optionNode = e.target.closest('.option')

                // khi click vào song
                if(songNode && !optionNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }

                // khi click vào option
                if(optionNode) {
                    var downloadPath = e.target.closest('.option').dataset.path
                    _this.currentIndex = Number(optionNode.dataset.index)

                    optionBox.style.inset = '0';
                    downloadBtn.setAttribute('href', downloadPath)
                }
        }
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        singerName.textContent = this.currentSong.singer
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`
        audio.src = this.currentSong.path
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
        // this.isMuted = this.config.isMuted

        
        // Object.assign(this, this.config)

        // hiển thị trạng thái ban đầu của nút repeat / random cho ứng dụng
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
        muteBtn.classList.toggle('active', this.isMuted)
    },
    nextSong: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong()
    },
    randomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
            
        }, 100);
    },
    start: function() {
        // gán cấu hình từ config vào ứng dụng
        this.loadConfig()

        // định nghĩa các thuộc tính cho object
        this.definedProperties()

        // xử lý các sự kiện
        this.handleEvent()

        // tải bài hát đầu tiên
        this.loadCurrentSong()

        // render songs
        this.render()
    }
}

app.start()