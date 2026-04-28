# Reusable Video Design Specification (VDS)

## 0. Metadata

- **Template name:** News Intro + Source Clip Explainer
- **Use case:** Video tin tức/giải trí ngắn, mở đầu bằng phông giới thiệu có giọng AI rồi chuyển sang video gốc.
- **Nền tảng:** TikTok, Reels, Shorts.
- **Tỉ lệ khung hình khuyến nghị:** 9:16.
- **Độ phân giải khuyến nghị:** 1080x1920.
- **Video tham chiếu:** Clip tin tức/giải trí dọc từ social video, dùng để phân tích style và cấu trúc, không dùng để đóng cứng timing.
- **Generated at:** 2026-04-27T20:18:35+07:00.

## 1. Mục đích tái sử dụng

VDS này dùng để sản xuất các video ngắn dạng “giới thiệu tin nhanh rồi phát clip gốc”. Cấu trúc phù hợp khi có một `[SOURCE_CLIP]` cần được đặt vào ngữ cảnh trước khi người xem xem toàn bộ tình huống. Phần intro giúp người xem hiểu ngay `[NEWS_TOPIC]`, còn phần clip gốc giữ lại tính thật, hài, hoặc viral của nội dung.

Mục tiêu không phải dựng lại y nguyên video mẫu, mà tái sử dụng công thức:

- Mở đầu bằng phông/khung tin tức có nhận diện `[NEWS_BRAND]`.
- Giọng `[AI_INTRO_VOICE]` đọc hook và tóm tắt ngữ cảnh.
- Sau khi intro kết thúc, chuyển sang `[SOURCE_CLIP]`.
- Giữ âm thanh gốc hoặc khoảnh khắc gốc làm trọng tâm giải trí.

## 2. Ý đồ sáng tạo (Creative Intent)

Định dạng này tạo cảm giác một bản tin giải trí nhanh: có độ tin cậy của giao diện tin tức, nhưng vẫn giữ nhịp vui và đời thường của clip viral. Phần AI intro đóng vai trò “biên tập viên”: nói ngắn, rõ, hơi kịch tính, giúp người xem biết vì sao clip đáng xem.

Trải nghiệm mong muốn:

- Người xem nắm ngữ cảnh trong vài giây đầu.
- Headline và phông tin tức tạo cảm giác có series/brand rõ ràng.
- Clip gốc được phát sau intro, không bị giải thích quá lâu.
- Các caption, icon, hoặc SFX chỉ nhấn mạnh điểm hài/cao trào, không lấn át footage chính.

## 3. Cấu trúc tự sự (Narrative Structure)

1. **News Hook Intro:** `[NEWS_BRAND]` xuất hiện với phông tin tức, headline lớn và giọng AI đọc câu mở đầu. Nội dung trả lời nhanh: chuyện gì đang xảy ra, ai/nhóm nào liên quan ở mức vai trò, vì sao đáng chú ý.
2. **Context Bridge:** Intro bổ sung một câu giải thích tình huống để người xem hiểu trước khi vào clip. Có thể dùng `[MAIN_HEADLINE]`, `[NEWS_TOPIC]`, hoặc caption phụ.
3. **Source Clip Playback:** Chuyển sang `[SOURCE_CLIP]`. Video gốc trở thành nội dung chính; âm thanh gốc được nâng lên, AI voice dừng hoặc chỉ chen rất ngắn nếu cần.
4. **Highlight Moment:** Khi clip có điểm hài/cao trào, dùng subtitle, icon, reaction text, hoặc SFX ngắn để dẫn mắt người xem.
5. **Loop/Outro:** Kết ở một khoảnh khắc còn dư âm, có thể giữ branding nhẹ hoặc source credit. Không cần outro dài.

## 4. Style DNA

- **Mood:** Tin tức giải trí, nhanh, rõ, hơi meme, nhưng vẫn gọn và dễ đọc.
- **Visual tone:** Nền tin tức đậm, tương phản cao; ưu tiên xanh lá/đen/trắng hoặc palette brand rõ ràng. Có thể dùng đỏ cho cảnh báo hoặc điểm nhấn nóng.
- **Pacing:** Intro ngắn, dứt khoát; sau intro để clip gốc thở tự nhiên. Cắt cảnh ưu tiên hard cut hoặc zoom nhẹ, tránh transition quá “music video”.
- **Typography:** Sans-serif đậm, chữ trắng hoặc vàng nhạt trên nền tối; headline viết hoa hoặc bán hoa để có cảm giác bản tin.
- **Energy index:** 7/10. Cần đủ nhanh để giữ retention nhưng không làm mất khả năng hiểu ngữ cảnh.
- **Cinematic index:** 3/10. Đây là format social news/viral, ưu tiên thông tin và nhịp xem hơn chất điện ảnh.

## 5. Hệ thống thời gian (Timing System)

Timing phải co giãn theo target duration và độ dài `[AI_INTRO_VOICE]`.

- **Intro block:** Khoảng 10-20% timeline. Kéo dài vừa đủ để AI đọc hook và context; không để intro dài hơn mức cần thiết.
- **Transition to source:** Khoảng 1-3% timeline. Dùng hard cut, quick zoom, hoặc wipe rất nhanh nếu brand yêu cầu.
- **Source clip body:** Khoảng 70-85% timeline. Đây là phần chính, giữ nhiều nhất thời lượng cho clip gốc.
- **Highlight overlays:** Xuất hiện theo beat nội dung, mỗi lần ngắn và có mục đích. Không phủ text liên tục nếu clip đã có nhiều hành động.
- **End/loop:** Khoảng 3-8% timeline. Có thể giữ source credit, logo nhỏ, hoặc kết ngay tại reaction/cao trào.

Quy tắc âm thanh theo timeline:

- Khi AI nói: giảm âm `[SOURCE_CLIP]` hoặc nhạc nền xuống thấp để lời rõ.
- Khi AI dứt câu: đưa âm thanh gốc lên làm trọng tâm.
- Nếu cần AI giải thích giữa clip, chỉ dùng câu rất ngắn và ducking rõ ràng.

## 6. Scene Blueprint

### SC_01 - News Intro Card

- **Vai trò:** Mở hook và đóng khung nội dung như một bản tin giải trí.
- **Visual:** Phông tin tức khung overlay trên video gốc.
- **Text:** `[NEWS_BRAND]`, `[NEWS_TOPIC]`, `[MAIN_HEADLINE]`, có thể thêm `[DATE_STAMP]`.
- **Audio:** `[AI_INTRO_VOICE]` đọc rõ, nhịp nhanh vừa phải, tông bản tin.
- **Motion cue:** Logo/bar trượt nhẹ vào màn hình; headline pop-in hoặc fade-in nhanh.

### SC_02 - Context Bridge

- **Vai trò:** Nối từ headline sang clip gốc, nói rõ người xem sắp thấy gì.
- **Visual:** Có thể preview `[SOURCE_CLIP]` ở giữa khung, nhưng vẫn còn phông tin tức và caption lớn.
- **Text:** Một câu tóm tắt ngữ cảnh, không quá dài.
- **Audio:** AI voice hoàn tất câu dẫn; nhạc nền hoặc âm gốc ở mức thấp.
- **Motion cue:** Zoom nhẹ vào vùng clip hoặc bar tin tức thu gọn.

### SC_03 - Source Clip Full Playback

- **Vai trò:** Phát clip gốc sau khi phần AI intro kết thúc.
- **Visual:** `[SOURCE_CLIP]` chiếm phần lớn hoặc toàn bộ màn hình dọc. Branding chỉ còn nhỏ, không che hành động chính.
- **Text:** Subtitle/caption nếu cần; tránh che mặt, tay, hoặc hành động trọng tâm.
- **Audio:** Âm thanh gốc là lớp chính.
- **Motion cue:** Không thêm motion phức tạp; ưu tiên giữ footage rõ.

### SC_04 - Highlight/Reaction Emphasis

- **Vai trò:** Nhấn khoảnh khắc hài, bất ngờ, hoặc điểm viral.
- **Visual:** Reaction text, icon check/cross, arrow, hoặc sticker rất ngắn.
- **Text:** `[HIGHLIGHT_TEXT]` ngắn, có thể dùng ngôn ngữ nói đời thường.
- **Audio:** SFX meme nhỏ hoặc ducking tức thời, không át nội dung chính.
- **Motion cue:** Scale/pop nhanh rồi biến mất.

### SC_05 - End Card / Loop Back

- **Vai trò:** Kết gọn, giữ brand hoặc tạo vòng lặp xem lại.
- **Visual:** Logo nhỏ/source credit hoặc giữ nguyên clip gốc đến điểm dừng tự nhiên.
- **Text:** `[SOURCE_CREDIT]` nếu cần.
- **Audio:** Có thể giữ âm gốc hoặc giảm nhẹ ở cuối.
- **Motion cue:** Không dùng outro dài; ưu tiên kết nhanh.

## 7. Asset Semantic Slots

- `[NEWS_BRAND]`: Tên/logo series tin tức hoặc kênh biên tập.
- `[NEWS_TOPIC]`: Chủ đề/từ khóa của clip, ví dụ trend, tình huống hài, sự việc xã hội.
- `[MAIN_HEADLINE]`: Headline ngắn, rõ, có tính hook.
- `[AI_INTRO_VOICE]`: File voice AI đọc phần giới thiệu.
- `[SOURCE_CLIP]`: Video gốc cần gắn sau intro.
- `[SOURCE_AUDIO]`: Âm thanh gốc của video.
- `[SOURCE_CREDIT]`: Nguồn/tác giả ở mức credit, không dùng làm nội dung định danh nếu không cần.
- `[DATE_STAMP]`: Ngày đăng hoặc nhãn thời sự giả lập.
- `[HIGHLIGHT_TEXT]`: Text nhấn khoảnh khắc đáng chú ý.
- `[SUBTITLES]`: Subtitle cho AI voice hoặc lời nói trong clip gốc.

## 8. Hệ thống Text

### MAIN_TITLE / MAIN_HEADLINE

- Đặt ở vùng trên hoặc dưới trung tâm, nằm trong safe zone.
- Font Bebas Neue, dễ đọc trên mobile, ko có text background.
- Không quá nhiều dòng; ưu tiên 1-3 dòng ngắn.
- Có thể dùng nền solid/gradient để tách khỏi footage.

### NEWS_BRAND

- Logo hoặc chữ nhỏ ở góc trên/trái hoặc trong bar tin tức.
- Giữ xuyên suốt intro; khi vào clip gốc có thể thu nhỏ.

### SUBTITLES

- Subtitle của AI voice cần sync theo cụm từ, không nhất thiết từng chữ.
- Subtitle của clip gốc chỉ bật khi lời nói khó nghe hoặc là điểm hài.
- Tránh vùng UI TikTok bên phải và caption hệ thống phía dưới.

### HIGHLIGHT_TEXT

- Chỉ dùng ở điểm cần nhấn.
- Ngắn, có tính reaction.
- Không biến toàn bộ video thành màn hình đầy chữ.

## 9. Hệ thống chuyển động (Motion System)

- **Intro background:** Bar tin tức trượt nhẹ, grid/line motion rất chậm hoặc đứng yên.
- **Headline:** Pop-in/fade-in nhanh; không dùng animation bay quá lâu.
- **Source clip transition:** Hard cut là mặc định. Có thể dùng zoom-in nhanh nếu muốn tạo cảm giác “vào vụ việc”.
- **Overlay during source:** Motion nhỏ, có điểm dừng rõ. Mọi icon/reaction text phải rời màn hình nhanh để trả lại spotlight cho `[SOURCE_CLIP]`.
- **Camera behavior:** Không crop mạnh nếu clip gốc đã là 9:16. Chỉ zoom/crop khi cần loại bỏ viền hoặc tập trung hành động.

## 10. Hệ thống âm thanh (Audio System)

- **AI voice:** Giọng rõ, đều, tông bản tin. Có thể là nam hoặc nữ, nhưng cần đọc tự nhiên và không quá chậm.
- **BGM:** Nhạc nền news/upbeat hoặc bed nhẹ. Khi AI nói, BGM ở mức nền thấp. Khi vào clip gốc, BGM giảm hoặc tắt nếu âm gốc quan trọng.
- **Source audio:** Sau intro, âm gốc là lớp chính. Không để nhạc nền làm mất lời thoại hoặc tiếng hiện trường.
- **Ducking:** Bắt buộc dùng ducking khi AI voice chồng lên âm gốc.
- **SFX:** Dùng tiết chế ở highlight. SFX phải phục vụ punchline, không thay nội dung gốc.

## 11. Quy tắc tái sử dụng (Reusability Rules)

- Giữ cấu trúc “AI intro trước, source clip sau” như DNA chính của format.
- Không phát `[SOURCE_CLIP]` quá lâu ở đầu nếu chưa có context; người xem cần biết lý do phải xem.
- Không để intro biến thành bài đọc dài. AI chỉ đặt ngữ cảnh, không kể lại toàn bộ clip.
- Branding phải nhất quán nhưng không che hành động chính.
- Text luôn nằm trong safe zone và không che mặt/biểu cảm/hành động trọng tâm.
- Có thể thay `[NEWS_BRAND]`, màu chủ đạo, headline style, và giọng AI theo kênh mới.
- Không bê nguyên tên người, chi tiết đời tư, hoặc thông tin định danh từ video gốc vào template.
- Khi dùng cho nội dung thương mại hoặc kênh public, xác nhận quyền sử dụng `[SOURCE_CLIP]` và `[SOURCE_AUDIO]`.
