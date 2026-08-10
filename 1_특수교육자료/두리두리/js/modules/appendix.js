/* ==========================================================================
   두리두리 (Duri-Duri) - Appendix Puzzle Modules (부록 퍼즐)
   Sub-modules:
     - spotDiff: 틀린그림찾기 4단계 (L1: 3곳 5문제, L2: 4곳 5문제, L3: 5곳 5문제, L4: 6곳 5문제, 총 20문제)
     - crossword: 4x4 가로세로 낱말퍼즐
   ========================================================================== */

class AppendixManager {
  constructor() {
    this.currentSubIndex = 0; // 0: spotDiff, 1: crossword
    this.subModules = ['spotDiff', 'crossword'];

    /* --------------------------------------------------------------------------
       틀린그림찾기 4단계 20문제 100% 픽셀 정렬 비주얼 일러스트 데이터셋
       -------------------------------------------------------------------------- */
    this.spotDiffData = {
      level1: [
        {
          id: 1,
          title: "1단계 1번: 예쁜 우리 집 🏡",
          diffCount: 3,
          promptText: "왼쪽(원본)과 오른쪽(틀린 그림) 중 다른 3곳(해님/구름, 문 옆 사라진 창문, 문고리)을 찾아 클릭하세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; flex-direction:column; justify-content:flex-end; align-items:center;">
              <div id="diff_left_sun" class="diff-target-area" style="position:absolute; top:12px; right:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('sun', '사라진 해님 ☀️', '해님이 ☁️ 구름 뒤로 사라졌어요!')">
                <span style="font-size:3.5rem;">☀️</span>
              </div>
              <div style="width:0; height:0; border-left:110px solid transparent; border-right:110px solid transparent; border-bottom:70px solid #ff7675;"></div>
              <div style="width:210px; height:120px; background:#ffeaa7; border:3px solid #d63031; position:relative; display:flex; justify-content:space-between; align-items:flex-end; padding:0 18px 0 18px;">
                <div id="diff_left_window" class="diff-target-area" style="width:55px; height:55px; margin-bottom:32px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('window', '사라진 창문 🪟', '오른쪽 집에는 문 옆의 예쁜 창문이 싹 사라져서 없어요!')">
                  <div style="width:48px; height:48px; background:#74b9ff; border:3px solid #0984e3; border-radius:8px; display:flex; justify-content:center; align-items:center; position:relative;">
                    <div style="position:absolute; width:100%; height:2px; background:#0984e3;"></div>
                    <div style="position:absolute; height:100%; width:2px; background:#0984e3;"></div>
                  </div>
                </div>
                <div id="diff_left_handle" class="diff-target-area" style="width:55px; height:75px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('handle', '사라진 문고리 🚪', '현관문의 노란 문고리가 사라졌어요!')">
                  <div style="width:48px; height:72px; background:#e17055; border:3px solid #d63031; border-radius:6px 6px 0 0; position:relative;">
                    <div style="position:absolute; right:6px; top:32px; width:9px; height:9px; background:#fdcb6e; border-radius:50%; border:1px solid #d63031;"></div>
                  </div>
                </div>
              </div>
              <div style="width:100%; height:25px; background:#81c784; margin-top:-2px;"></div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; flex-direction:column; justify-content:flex-end; align-items:center;">
              <div id="diff_right_sun" class="diff-target-area" style="position:absolute; top:12px; right:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('sun', '사라진 해님 ☀️', '해님이 ☁️ 구름 뒤로 사라졌어요!')">
                <span style="font-size:3.2rem;">☁️</span>
              </div>
              <div style="width:0; height:0; border-left:110px solid transparent; border-right:110px solid transparent; border-bottom:70px solid #ff7675;"></div>
              <div style="width:210px; height:120px; background:#ffeaa7; border:3px solid #d63031; position:relative; display:flex; justify-content:space-between; align-items:flex-end; padding:0 18px 0 18px;">
                <div id="diff_right_window" class="diff-target-area" style="width:55px; height:55px; margin-bottom:32px; display:flex; align-items:center; justify-content:center; cursor:pointer; border:2px dashed rgba(214,48,49,0.3); border-radius:8px;" onclick="appendixManager.clickDiffTarget('window', '사라진 창문 🪟', '오른쪽 집에는 문 옆의 예쁜 창문이 싹 사라져서 없어요!')">
                  <span style="font-size:1.5rem; opacity:0.3;">❌</span>
                </div>
                <div id="diff_right_handle" class="diff-target-area" style="width:55px; height:75px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('handle', '사라진 문고리 🚪', '현관문의 노란 문고리가 사라졌어요!')">
                  <div style="width:48px; height:72px; background:#e17055; border:3px solid #d63031; border-radius:6px 6px 0 0; position:relative;"></div>
                </div>
              </div>
              <div style="width:100%; height:25px; background:#81c784; margin-top:-2px;"></div>
            </div>
          `,
          diffs: ["sun", "window", "handle"],
          leftBg: "#eef6ff",
          rightBg: "#eef6ff"
        },
        {
          id: 2,
          title: "1단계 2번: 아기 곰의 하루 🐻",
          diffCount: 3,
          promptText: "곰돌이 그림에서 다른 3곳(모자 장식, 스카프 색상, 꿀단지 스티커)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center;">
              <div id="diff_left_bee" class="diff-target-area" style="position:absolute; top:15px; left:30px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bee', '모자의 핑크 꽃 🌸', '꿀벌 대신 예쁜 분홍 꽃으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🐝</span>
              </div>
              <div style="font-size:5rem;">🐻</div>
              <div id="diff_left_scarf" class="diff-target-area" style="width:70px; height:45px; margin-top:-20px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('scarf', '파란 스카프 🔵', '스카프가 빨간색에서 파란색으로 바뀌었어요!')">
                <span style="font-size:1.8rem;">🔴</span>
              </div>
              <div id="diff_left_pot" class="diff-target-area" style="position:absolute; bottom:15px; right:30px; width:70px; height:70px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('pot', '별 스티커 ⭐', '꿀단지 표시에 꿀 대신 별 스티커가 붙었어요!')">
                <span style="font-size:3.2rem;">🍯</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center;">
              <div id="diff_right_bee" class="diff-target-area" style="position:absolute; top:15px; left:30px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bee', '모자의 핑크 꽃 🌸', '꿀벌 대신 예쁜 분홍 꽃으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🌸</span>
              </div>
              <div style="font-size:5rem;">🐻</div>
              <div id="diff_right_scarf" class="diff-target-area" style="width:70px; height:45px; margin-top:-20px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('scarf', '파란 스카프 🔵', '스카프가 빨간색에서 파란색으로 바뀌었어요!')">
                <span style="font-size:1.8rem;">🔵</span>
              </div>
              <div id="diff_right_pot" class="diff-target-area" style="position:absolute; bottom:15px; right:30px; width:70px; height:70px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('pot', '별 스티커 ⭐', '꿀단지 표시에 꿀 대신 별 스티커가 붙었어요!')">
                <span style="font-size:3.2rem;">⭐</span>
              </div>
            </div>
          `,
          diffs: ["bee", "scarf", "pot"],
          leftBg: "#fffbe6",
          rightBg: "#fffbe6"
        },
        {
          id: 3,
          title: "1단계 3번: 바닷속 물고기 🐟",
          diffCount: 3,
          promptText: "바닷속 풍경에서 다른 3곳(조개 진주, 물고기 지느러미, 물방울)을 찾아보세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:center; align-items:center;">
              <div id="diff_left_bubble" class="diff-target-area" style="position:absolute; top:15px; left:25px; width:90px; height:50px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bubble', '줄어든 물방울 🫧', '보글보글 물방울이 1개로 줄어들었어요!')">
                <span style="font-size:2rem;">🫧🫧🫧</span>
              </div>
              <div id="diff_left_fin" class="diff-target-area" style="width:130px; height:100px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('fin', '점무늬 물고기 🟡', '물고기 몸통 지느러미에 점무늬가 생겼어요!')">
                <span style="font-size:5.5rem;">🐟</span>
              </div>
              <div id="diff_left_pearl" class="diff-target-area" style="position:absolute; bottom:15px; left:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('pearl', '빈 조개 🐚', '조개 속 예쁜 진주 보석이 사라졌어요!')">
                <span style="font-size:3rem;">🦪</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:center; align-items:center;">
              <div id="diff_right_bubble" class="diff-target-area" style="position:absolute; top:15px; left:25px; width:90px; height:50px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bubble', '줄어든 물방울 🫧', '보글보글 물방울이 1개로 줄어들었어요!')">
                <span style="font-size:2rem;">🫧</span>
              </div>
              <div id="diff_right_fin" class="diff-target-area" style="width:130px; height:100px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('fin', '점무늬 물고기 🟡', '물고기 몸통 지느러미에 점무늬가 생겼어요!')">
                <span style="font-size:5.5rem;">🐠</span>
              </div>
              <div id="diff_right_pearl" class="diff-target-area" style="position:absolute; bottom:15px; left:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('pearl', '빈 조개 🐚', '조개 속 예쁜 진주 보석이 사라졌어요!')">
                <span style="font-size:3rem;">🐚</span>
              </div>
            </div>
          `,
          diffs: ["bubble", "fin", "pearl"],
          leftBg: "#e6fffa",
          rightBg: "#e6fffa"
        },
        {
          id: 4,
          title: "1단계 4번: 즐거운 놀이터 🎠",
          diffCount: 3,
          promptText: "놀이터에서 다른 3곳(미끄럼틀 깃발, 시소 동물, 모래 바구니)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_left_flag" class="diff-target-area" style="position:absolute; top:10px; left:25px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('flag', '파란 깃발 🟦', '미끄럼틀 깃발이 빨간색에서 파란색으로 바뀌었어요!')">
                <span style="font-size:2.5rem;">🚩</span>
              </div>
              <div style="font-size:4.5rem;">🛝</div>
              <div id="diff_left_toy" class="diff-target-area" style="width:70px; height:70px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('toy', '놀이터 고양이 🐱', '시소에 탄 토끼가 고양이로 바뀌었어요!')">
                <span style="font-size:3.5rem;">🐰</span>
              </div>
              <div id="diff_left_bucket" class="diff-target-area" style="position:absolute; bottom:15px; left:35px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bucket', '초록 바구니 🟢', '모래사장 바구니가 초록색으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🟡</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_right_flag" class="diff-target-area" style="position:absolute; top:10px; left:25px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('flag', '파란 깃발 🟦', '미끄럼틀 깃발이 빨간색에서 파란색으로 바뀌었어요!')">
                <span style="font-size:2.5rem;">🟦</span>
              </div>
              <div style="font-size:4.5rem;">🛝</div>
              <div id="diff_right_toy" class="diff-target-area" style="width:70px; height:70px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('toy', '놀이터 고양이 🐱', '시소에 탄 토끼가 고양이로 바뀌었어요!')">
                <span style="font-size:3.5rem;">🐱</span>
              </div>
              <div id="diff_right_bucket" class="diff-target-area" style="position:absolute; bottom:15px; left:35px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bucket', '초록 바구니 🟢', '모래사장 바구니가 초록색으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🟢</span>
              </div>
            </div>
          `,
          diffs: ["flag", "toy", "bucket"],
          leftBg: "#f0fdf4",
          rightBg: "#f0fdf4"
        },
        {
          id: 5,
          title: "1단계 5번: 신나는 생일 파티 🎂",
          diffCount: 3,
          promptText: "생일 파티에서 다른 3곳(촛불 개수, 고깔모자 장식, 풍선 색상)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center;">
              <div id="diff_left_cap" class="diff-target-area" style="position:absolute; top:10px; left:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('cap', '노란 구슬 고깔모자 🟡', '고깔모자 위 구슬이 노란색으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🥳</span>
              </div>
              <div id="diff_left_balloon" class="diff-target-area" style="position:absolute; top:15px; right:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('balloon', '보라색 풍선 💜', '핑크 풍선이 보라색 풍선으로 바뀌었어요!')">
                <span style="font-size:3.5rem;">🩷</span>
              </div>
              <div id="diff_left_candle" class="diff-target-area" style="width:90px; height:45px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('candle', '줄어든 촛불 🕯️', '케이크 촛불이 3개에서 2개로 줄어들었어요!')">
                <span style="font-size:1.8rem;">🕯️🕯️🕯️</span>
              </div>
              <div style="font-size:4.5rem; margin-top:-10px;">🎂</div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center;">
              <div id="diff_right_cap" class="diff-target-area" style="position:absolute; top:10px; left:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('cap', '노란 구슬 고깔모자 🟡', '고깔모자 위 구슬이 노란색으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🤠</span>
              </div>
              <div id="diff_right_balloon" class="diff-target-area" style="position:absolute; top:15px; right:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('balloon', '보라색 풍선 💜', '핑크 풍선이 보라색 풍선으로 바뀌었어요!')">
                <span style="font-size:3.5rem;">💜</span>
              </div>
              <div id="diff_right_candle" class="diff-target-area" style="width:90px; height:45px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('candle', '줄어든 촛불 🕯️', '케이크 촛불이 3개에서 2개로 줄어들었어요!')">
                <span style="font-size:1.8rem;">🕯️🕯️</span>
              </div>
              <div style="font-size:4.5rem; margin-top:-10px;">🎂</div>
            </div>
          `,
          diffs: ["cap", "balloon", "candle"],
          leftBg: "#fff5f5",
          rightBg: "#fff5f5"
        }
      ],
      level2: [
        {
          id: 6,
          title: "2단계 1번: 시골 농장 풍경 🚜",
          diffCount: 4,
          promptText: "농장 풍경에서 다른 4곳(풍차 날개, 트랙터 바퀴, 울타리 새, 젖소 무늬)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_left_windmill" class="diff-target-area" style="position:absolute; top:10px; left:20px; width:70px; height:70px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('windmill', '풍차 날개 3개 🎡', '풍차 날개가 4개에서 3개로 줄었어요!')">
                <span style="font-size:3.5rem;">🎡</span>
              </div>
              <div id="diff_left_wheel" class="diff-target-area" style="width:110px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('wheel', '작아진 트랙터 바퀴 🛞', '트랙터 바퀴가 조그맣게 작아졌어요!')">
                <span style="font-size:4.5rem;">🚜</span>
              </div>
              <div id="diff_left_bird" class="diff-target-area" style="position:absolute; top:15px; right:25px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bird', '사라진 새 🕊️', '울타리 위의 참새가 날아가 사라졌어요!')">
                <span style="font-size:2.2rem;">🕊️</span>
              </div>
              <div id="diff_left_spot" class="diff-target-area" style="position:absolute; bottom:15px; right:35px; width:75px; height:75px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('spot', '별 얼룩 젖소 ⭐', '젖소 얼룩무늬가 별 모양으로 바뀌었어요!')">
                <span style="font-size:3.8rem;">🐄</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_right_windmill" class="diff-target-area" style="position:absolute; top:10px; left:20px; width:70px; height:70px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('windmill', '풍차 날개 3개 🎡', '풍차 날개가 4개에서 3개로 줄었어요!')">
                <span style="font-size:3rem;">⚙️</span>
              </div>
              <div id="diff_right_wheel" class="diff-target-area" style="width:110px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('wheel', '작아진 트랙터 바퀴 🛞', '트랙터 바퀴가 조그맣게 작아졌어요!')">
                <span style="font-size:3.8rem;">🏎️</span>
              </div>
              <div id="diff_right_bird" class="diff-target-area" style="position:absolute; top:15px; right:25px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bird', '사라진 새 🕊️', '울타리 위의 참새가 날아가 사라졌어요!')">
                <span style="font-size:1.8rem; opacity:0.3;">☁️</span>
              </div>
              <div id="diff_right_spot" class="diff-target-area" style="position:absolute; bottom:15px; right:35px; width:75px; height:75px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('spot', '별 얼룩 젖소 ⭐', '젖소 얼룩무늬가 별 모양으로 바뀌었어요!')">
                <span style="font-size:3.8rem;">🐅</span>
              </div>
            </div>
          `,
          diffs: ["windmill", "wheel", "bird", "spot"],
          leftBg: "#fefcbf",
          rightBg: "#fefcbf"
        },
        {
          id: 7,
          title: "2단계 2번: 숲속 캠핑장 ⛺",
          diffCount: 4,
          promptText: "캠핑장에서 다른 4곳(달 방향, 텐트 입구, 통나무 개수, 마시멜로)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_left_moon" class="diff-target-area" style="position:absolute; top:10px; right:20px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('moon', '달 방향 🌛', '초승달의 굽어진 방향이 반대로 꺾였어요!')">
                <span style="font-size:3.2rem;">🌙</span>
              </div>
              <div id="diff_left_door" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('door', '주황 텐트 입구 🟠', '텐트 삼각 입구 색이 주황색으로 바뀌었어요!')">
                <span style="font-size:4.8rem;">⛺</span>
              </div>
              <div id="diff_left_wood" class="diff-target-area" style="position:absolute; bottom:15px; right:40px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('wood', '줄어든 통나무 🪵', '모닥불 통나무가 3개에서 2개로 줄었어요!')">
                <span style="font-size:3.2rem;">🔥</span>
              </div>
              <div id="diff_left_mallow" class="diff-target-area" style="position:absolute; top:65px; right:85px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('mallow', '마시멜로 1개 🍡', '마시멜로 꼬치가 1개로 줄어들었어요!')">
                <span style="font-size:2.2rem;">🍡</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_right_moon" class="diff-target-area" style="position:absolute; top:10px; right:20px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('moon', '달 방향 🌛', '초승달의 굽어진 방향이 반대로 꺾였어요!')">
                <span style="font-size:3.2rem;">🌛</span>
              </div>
              <div id="diff_right_door" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('door', '주황 텐트 입구 🟠', '텐트 삼각 입구 색이 주황색으로 바뀌었어요!')">
                <span style="font-size:4.8rem;">🎪</span>
              </div>
              <div id="diff_right_wood" class="diff-target-area" style="position:absolute; bottom:15px; right:40px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('wood', '줄어든 통나무 🪵', '모닥불 통나무가 3개에서 2개로 줄었어요!')">
                <span style="font-size:3rem;">💥</span>
              </div>
              <div id="diff_right_mallow" class="diff-target-area" style="position:absolute; top:65px; right:85px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('mallow', '마시멜로 1개 🍡', '마시멜로 꼬치가 1개로 줄어들었어요!')">
                <span style="font-size:1.8rem;">🍢</span>
              </div>
            </div>
          `,
          diffs: ["moon", "door", "wood", "mallow"],
          leftBg: "#f0fdf4",
          rightBg: "#f0fdf4"
        },
        {
          id: 8,
          title: "2단계 3번: 우주 비행선 탐험 🚀",
          diffCount: 4,
          promptText: "우주 공간에서 다른 4곳(우주복 안테나, 토성 고리, 창문 외계인, 로켓 불꽃)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_left_antenna" class="diff-target-area" style="position:absolute; top:10px; left:20px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('antenna', '안테나 2개 📡', '우주복 헬멧 안테나가 2개로 늘어났어요!')">
                <span style="font-size:3.5rem;">👨‍🚀</span>
              </div>
              <div id="diff_left_saturn" class="diff-target-area" style="position:absolute; top:15px; right:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('saturn', '보라색 토성 고리 🟣', '토성 고리 색상이 보라색으로 바뀌었어요!')">
                <span style="font-size:3.5rem;">🪐</span>
              </div>
              <div id="diff_left_flame" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('flame', '파란 로켓 불꽃 💙', '로켓 추진 불꽃이 푸른색으로 바뀌었어요!')">
                <span style="font-size:5rem;">🚀</span>
              </div>
              <div id="diff_left_alien" class="diff-target-area" style="position:absolute; bottom:20px; right:40px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('alien', '웃는 외계인 😀', '창문 속 외계인이 윙크 대신 방긋 웃고 있어요!')">
                <span style="font-size:2.8rem;">👽</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_right_antenna" class="diff-target-area" style="position:absolute; top:10px; left:20px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('antenna', '안테나 2개 📡', '우주복 헬멧 안테나가 2개로 늘어났어요!')">
                <span style="font-size:3.5rem;">🤖</span>
              </div>
              <div id="diff_right_saturn" class="diff-target-area" style="position:absolute; top:15px; right:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('saturn', '보라색 토성 고리 🟣', '토성 고리 색상이 보라색으로 바뀌었어요!')">
                <span style="font-size:3.5rem;">🔮</span>
              </div>
              <div id="diff_right_flame" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('flame', '파란 로켓 불꽃 💙', '로켓 추진 불꽃이 푸른색으로 바뀌었어요!')">
                <span style="font-size:5rem;">🛸</span>
              </div>
              <div id="diff_right_alien" class="diff-target-area" style="position:absolute; bottom:20px; right:40px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('alien', '웃는 외계인 😀', '창문 속 외계인이 윙크 대신 방긋 웃고 있어요!')">
                <span style="font-size:2.8rem;">👾</span>
              </div>
            </div>
          `,
          diffs: ["antenna", "saturn", "flame", "alien"],
          leftBg: "#f3e8ff",
          rightBg: "#f3e8ff"
        },
        {
          id: 9,
          title: "2단계 4번: 달콤한 과자 집 🍩",
          diffCount: 4,
          promptText: "과자 집에서 다른 4곳(지붕 체리, 젤리 창문, 빼빼로 울타리, 사탕 형태)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_left_cherry" class="diff-target-area" style="position:absolute; top:10px; left:65px; width:100px; height:50px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('cherry', '줄어든 체리 🍒', '지붕 체리가 3개에서 2개로 줄었어요!')">
                <span style="font-size:2.8rem;">🍒🍒🍒</span>
              </div>
              <div id="diff_left_jelly" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('jelly', '네모 젤리 창문 🟩', '창문 하트 젤리가 네모 젤리로 바뀌었어요!')">
                <span style="font-size:5rem;">🏠</span>
              </div>
              <div id="diff_left_candy" class="diff-target-area" style="position:absolute; bottom:15px; left:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('candy', '알사탕 🍬', '막대사탕이 동그란 알사탕으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🍭</span>
              </div>
              <div id="diff_left_pepero" class="diff-target-area" style="position:absolute; bottom:15px; right:30px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('pepero', '딸기 빼빼로 🍓', '초코 빼빼로가 핑크 딸기 빼빼로로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🍫</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_right_cherry" class="diff-target-area" style="position:absolute; top:10px; left:65px; width:100px; height:50px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('cherry', '줄어든 체리 🍒', '지붕 체리가 3개에서 2개로 줄었어요!')">
                <span style="font-size:2.5rem;">🍒🍒</span>
              </div>
              <div id="diff_right_jelly" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('jelly', '네모 젤리 창문 🟩', '창문 하트 젤리가 네모 젤리로 바뀌었어요!')">
                <span style="font-size:5rem;">🏰</span>
              </div>
              <div id="diff_right_candy" class="diff-target-area" style="position:absolute; bottom:15px; left:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('candy', '알사탕 🍬', '막대사탕이 동그란 알사탕으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🍬</span>
              </div>
              <div id="diff_right_pepero" class="diff-target-area" style="position:absolute; bottom:15px; right:30px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('pepero', '딸기 빼빼로 🍓', '초코 빼빼로가 핑크 딸기 빼빼로로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🍓</span>
              </div>
            </div>
          `,
          diffs: ["cherry", "jelly", "candy", "pepero"],
          leftBg: "#fff5f5",
          rightBg: "#fff5f5"
        },
        {
          id: 10,
          title: "2단계 5번: 봄날의 공원 나들이 🌸",
          diffCount: 4,
          promptText: "공원 나들이에서 다른 4곳(하늘 구름, 돗자리 무늬, 샌드위치, 새끼 오리)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_left_cloud" class="diff-target-area" style="position:absolute; top:10px; right:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('cloud', '동그란 뭉게구름 ☁️', '하늘 하트 구름이 동그란 뭉게구름으로 바뀌었어요!')">
                <span style="font-size:3rem;">💖</span>
              </div>
              <div id="diff_left_mat" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('mat', '파란 줄무늬 돗자리 🟦', '체크 돗자리가 파란 줄무늬 돗자리로 바뀌었어요!')">
                <span style="font-size:4.8rem;">🧺</span>
              </div>
              <div id="diff_left_sandwich" class="diff-target-area" style="position:absolute; top:75px; left:70px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('sandwich', '네모 샌드위치 🥪', '세모 샌드위치가 네모 샌드위치로 바뀌었어요!')">
                <span style="font-size:2.5rem;">🔺</span>
              </div>
              <div id="diff_left_duck" class="diff-target-area" style="position:absolute; bottom:15px; right:30px; width:90px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('duck', '새끼 오리 1마리 🐥', '어미 오리 뒤 새끼 오리가 1마리로 줄었어요!')">
                <span style="font-size:3.2rem;">🦆🐥🐥</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_right_cloud" class="diff-target-area" style="position:absolute; top:10px; right:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('cloud', '동그란 뭉게구름 ☁️', '하늘 하트 구름이 동그란 뭉게구름으로 바뀌었어요!')">
                <span style="font-size:3rem;">☁️</span>
              </div>
              <div id="diff_right_mat" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('mat', '파란 줄무늬 돗자리 🟦', '체크 돗자리가 파란 줄무늬 돗자리로 바뀌었어요!')">
                <span style="font-size:4.8rem;">🪴</span>
              </div>
              <div id="diff_right_sandwich" class="diff-target-area" style="position:absolute; top:75px; left:70px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('sandwich', '네모 샌드위치 🥪', '세모 샌드위치가 네모 샌드위치로 바뀌었어요!')">
                <span style="font-size:2.5rem;">🥪</span>
              </div>
              <div id="diff_right_duck" class="diff-target-area" style="position:absolute; bottom:15px; right:30px; width:90px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('duck', '새끼 오리 1마리 🐥', '어미 오리 뒤 새끼 오리가 1마리로 줄었어요!')">
                <span style="font-size:3rem;">🦆🐥</span>
              </div>
            </div>
          `,
          diffs: ["cloud", "mat", "sandwich", "duck"],
          leftBg: "#f0fdf4",
          rightBg: "#f0fdf4"
        }
      ],
      level3: [
        {
          id: 11,
          title: "3단계 1번: 동화 속 거울 궁전 🏰",
          diffCount: 5,
          promptText: "거울 궁전에서 다른 5곳(성 깃발, 창살 개수, 분수대 물줄기, 장화 색상, 드레스 보석)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_left_crest" class="diff-target-area" style="position:absolute; top:10px; left:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('crest', '별 문양 깃발 ⭐', '성 깃발 왕관 문양이 별 문양으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">👑</span>
              </div>
              <div id="diff_left_gate" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('gate', '성문 창살 4개 🚪', '성문 쇠창살이 5개에서 4개로 줄어들었어요!')">
                <span style="font-size:5rem;">🏰</span>
              </div>
              <div id="diff_left_fountain" class="diff-target-area" style="position:absolute; bottom:15px; right:20px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('fountain', '물줄기 2개 💦', '분수대 물줄기가 3개에서 2개로 줄어들었어요!')">
                <span style="font-size:3rem;">⛲</span>
              </div>
              <div id="diff_left_boots" class="diff-target-area" style="position:absolute; top:80px; left:15px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('boots', '파란 장화 👢', '시종의 빨간 장화가 파란색 장화로 바뀌었어요!')">
                <span style="font-size:2.5rem;">🔴</span>
              </div>
              <div id="diff_left_gem" class="diff-target-area" style="position:absolute; top:75px; right:65px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('gem', '초록 에메랄드 💚', '드레스 루비 보석이 초록 에메랄드로 바뀌었어요!')">
                <span style="font-size:2.5rem;">💎</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_right_crest" class="diff-target-area" style="position:absolute; top:10px; left:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('crest', '별 문양 깃발 ⭐', '성 깃발 왕관 문양이 별 문양으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">⭐</span>
              </div>
              <div id="diff_right_gate" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('gate', '성문 창살 4개 🚪', '성문 쇠창살이 5개에서 4개로 줄어들었어요!')">
                <span style="font-size:5rem;">🏯</span>
              </div>
              <div id="diff_right_fountain" class="diff-target-area" style="position:absolute; bottom:15px; right:20px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('fountain', '물줄기 2개 💦', '분수대 물줄기가 3개에서 2개로 줄어들었어요!')">
                <span style="font-size:3rem;">🌊</span>
              </div>
              <div id="diff_right_boots" class="diff-target-area" style="position:absolute; top:80px; left:15px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('boots', '파란 장화 👢', '시종의 빨간 장화가 파란색 장화로 바뀌었어요!')">
                <span style="font-size:2.5rem;">🔵</span>
              </div>
              <div id="diff_right_gem" class="diff-target-area" style="position:absolute; top:75px; right:65px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('gem', '초록 에메랄드 💚', '드레스 루비 보석이 초록 에메랄드로 바뀌었어요!')">
                <span style="font-size:2.5rem;">💚</span>
              </div>
            </div>
          `,
          diffs: ["crest", "gate", "fountain", "boots", "gem"],
          leftBg: "#fcf5ff",
          rightBg: "#fcf5ff"
        },
        {
          id: 12,
          title: "3단계 2번: 열대 과일 정글 🐒",
          diffCount: 5,
          promptText: "정글에서 다른 5곳(바나나, 원숭이 손 과일, 앵무새, 덩굴 꽃, 개구리 눈)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_left_banana" class="diff-target-area" style="position:absolute; top:10px; left:20px; width:100px; height:50px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('banana', '바나나 3송이 🍌', '바나나가 4송이에서 3송이로 줄어들었어요!')">
                <span style="font-size:2.2rem;">🍌🍌🍌🍌</span>
              </div>
              <div id="diff_left_fruit" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('fruit', '파인애플 🍍', '원숭이가 야자열매 대신 파인애플을 쥐고 있어요!')">
                <span style="font-size:4.8rem;">🐒</span>
              </div>
              <div id="diff_left_bird" class="diff-target-area" style="position:absolute; top:15px; right:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bird', '초록 앵무새 🦜', '앵무새 깃털 색이 빨간색에서 초록색으로 바뀌었어요!')">
                <span style="font-size:3rem;">🔴</span>
              </div>
              <div id="diff_left_flower" class="diff-target-area" style="position:absolute; bottom:15px; right:65px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('flower', '주황 덩굴 꽃 🟧', '분홍 꽃이 주황색 꽃으로 바뀌었어요!')">
                <span style="font-size:2.5rem;">🌸</span>
              </div>
              <div id="diff_left_frog" class="diff-target-area" style="position:absolute; bottom:15px; left:20px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('frog', '윙크하는 개구리 🐸', '개구리가 눈을 찡긋 윙크하고 있어요!')">
                <span style="font-size:3rem;">🐸</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_right_banana" class="diff-target-area" style="position:absolute; top:10px; left:20px; width:100px; height:50px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('banana', '바나나 3송이 🍌', '바나나가 4송이에서 3송이로 줄어들었어요!')">
                <span style="font-size:2.2rem;">🍌🍌🍌</span>
              </div>
              <div id="diff_right_fruit" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('fruit', '파인애플 🍍', '원숭이가 야자열매 대신 파인애플을 쥐고 있어요!')">
                <span style="font-size:4.8rem;">🦍</span>
              </div>
              <div id="diff_right_bird" class="diff-target-area" style="position:absolute; top:15px; right:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bird', '초록 앵무새 🦜', '앵무새 깃털 색이 빨간색에서 초록색으로 바뀌었어요!')">
                <span style="font-size:3rem;">🦜</span>
              </div>
              <div id="diff_right_flower" class="diff-target-area" style="position:absolute; bottom:15px; right:65px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('flower', '주황 덩굴 꽃 🟧', '분홍 꽃이 주황색 꽃으로 바뀌었어요!')">
                <span style="font-size:2.5rem;">🟧</span>
              </div>
              <div id="diff_right_frog" class="diff-target-area" style="position:absolute; bottom:15px; left:20px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('frog', '윙크하는 개구리 🐸', '개구리가 눈을 찡긋 윙크하고 있어요!')">
                <span style="font-size:3rem;">🐊</span>
              </div>
            </div>
          `,
          diffs: ["banana", "fruit", "bird", "flower", "frog"],
          leftBg: "#f0fdf4",
          rightBg: "#f0fdf4"
        },
        {
          id: 13,
          title: "3단계 3번: 신나는 놀이동산 🎡",
          diffCount: 5,
          promptText: "놀이동산에서 다른 5곳(관람차 캡슐, 팝콘 상자, 풍선 개수, 롤러코스터, 회전목마 안장)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_left_capsule" class="diff-target-area" style="position:absolute; top:10px; left:20px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('capsule', '노란 캡슐 🟨', '관람차 보라 캡슐이 노란색으로 바뀌었어요!')">
                <span style="font-size:3.5rem;">🟣</span>
              </div>
              <div id="diff_left_rail" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('rail', '롤러코스터 레일 🎢', '트랙 구부러짐 방향이 반대로 꺾였어요!')">
                <span style="font-size:4.8rem;">🎡</span>
              </div>
              <div id="diff_left_balloon" class="diff-target-area" style="position:absolute; top:15px; right:20px; width:110px; height:50px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('balloon', '풍선 4개 🎈', '풍선 아저씨의 풍선이 5개에서 4개로 줄었어요!')">
                <span style="font-size:2.2rem;">🎈🎈🎈🎈🎈</span>
              </div>
              <div id="diff_left_popcorn" class="diff-target-area" style="position:absolute; bottom:15px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('popcorn', '파란 팝콘 상자 🔵', '팝콘 상자 빨간 줄무늬가 파란색으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🔴</span>
              </div>
              <div id="diff_left_saddle" class="diff-target-area" style="position:absolute; bottom:15px; right:65px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('saddle', '은빛 안장 🎠', '회전목마 말의 금빛 안장이 은빛 안장으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🟡</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_right_capsule" class="diff-target-area" style="position:absolute; top:10px; left:20px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('capsule', '노란 캡슐 🟨', '관람차 보라 캡슐이 노란색으로 바뀌었어요!')">
                <span style="font-size:3.5rem;">🟨</span>
              </div>
              <div id="diff_right_rail" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('rail', '롤러코스터 레일 🎢', '트랙 구부러짐 방향이 반대로 꺾였어요!')">
                <span style="font-size:4.8rem;">🎢</span>
              </div>
              <div id="diff_right_balloon" class="diff-target-area" style="position:absolute; top:15px; right:20px; width:110px; height:50px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('balloon', '풍선 4개 🎈', '풍선 아저씨의 풍선이 5개에서 4개로 줄었어요!')">
                <span style="font-size:2.2rem;">🎈🎈🎈🎈</span>
              </div>
              <div id="diff_right_popcorn" class="diff-target-area" style="position:absolute; bottom:15px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('popcorn', '파란 팝콘 상자 🔵', '팝콘 상자 빨간 줄무늬가 파란색으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🔵</span>
              </div>
              <div id="diff_right_saddle" class="diff-target-area" style="position:absolute; bottom:15px; right:65px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('saddle', '은빛 안장 🎠', '회전목마 말의 금빛 안장이 은빛 안장으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">⚪</span>
              </div>
            </div>
          `,
          diffs: ["capsule", "rail", "balloon", "popcorn", "saddle"],
          leftBg: "#fffbe6",
          rightBg: "#fffbe6"
        },
        {
          id: 14,
          title: "3단계 4번: 크리스마스 산타 마을 🎅",
          diffCount: 5,
          promptText: "산타 마을에서 다른 5곳(모자 방울, 루돌프 코, 선물 보따리, 굴뚝 연기, 트리 별)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_left_bell" class="diff-target-area" style="position:absolute; top:10px; left:20px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bell', '황금 방울 🟡', '산타 모자 끝 방울이 하얀색에서 황금색으로 바뀌었어요!')">
                <span style="font-size:3rem;">⚪</span>
              </div>
              <div id="diff_left_nose" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('nose', '초록색 사슴 코 🟢', '루돌프의 빨간 코가 초록색 코로 바뀌었어요!')">
                <span style="font-size:4.8rem;">🎅</span>
              </div>
              <div id="diff_left_smoke" class="diff-target-area" style="position:absolute; top:15px; right:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('smoke', '구름 연기 ☁️', '굴뚝 하트 연기가 모락모락 구름 연기로 바뀌었어요!')">
                <span style="font-size:3rem;">💖</span>
              </div>
              <div id="diff_left_gift" class="diff-target-area" style="position:absolute; bottom:15px; left:15px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('gift', '선물 상자 🎁', '썰매 안 양말 선물이 예쁜 선물 상자로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🧦</span>
              </div>
              <div id="diff_left_star" class="diff-target-area" style="position:absolute; bottom:15px; right:65px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('star', '8각 반짝별 ✨', '트리 꼭대기 별이 8각 반짝별로 바뀌었어요!')">
                <span style="font-size:2.8rem;">⭐</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_right_bell" class="diff-target-area" style="position:absolute; top:10px; left:20px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bell', '황금 방울 🟡', '산타 모자 끝 방울이 하얀색에서 황금색으로 바뀌었어요!')">
                <span style="font-size:3rem;">🟡</span>
              </div>
              <div id="diff_right_nose" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('nose', '초록색 사슴 코 🟢', '루돌프의 빨간 코가 초록색 코로 바뀌었어요!')">
                <span style="font-size:4.8rem;">🦌</span>
              </div>
              <div id="diff_right_smoke" class="diff-target-area" style="position:absolute; top:15px; right:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('smoke', '구름 연기 ☁️', '굴뚝 하트 연기가 모락모락 구름 연기로 바뀌었어요!')">
                <span style="font-size:3rem;">☁️</span>
              </div>
              <div id="diff_right_gift" class="diff-target-area" style="position:absolute; bottom:15px; left:15px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('gift', '선물 상자 🎁', '썰매 안 양말 선물이 예쁜 선물 상자로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🎁</span>
              </div>
              <div id="diff_right_star" class="diff-target-area" style="position:absolute; bottom:15px; right:65px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('star', '8각 반짝별 ✨', '트리 꼭대기 별이 8각 반짝별로 바뀌었어요!')">
                <span style="font-size:2.8rem;">✨</span>
              </div>
            </div>
          `,
          diffs: ["bell", "nose", "smoke", "gift", "star"],
          leftBg: "#fff5f5",
          rightBg: "#fff5f5"
        },
        {
          id: 15,
          title: "3단계 5번: 아쿠아리움 대형 수족관 🦈",
          diffCount: 5,
          promptText: "수족관에서 다른 5곳(상어 지느러미, 가오리 표정, 잠수함 창문, 해파리 다리, 산호초 색)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_left_scar" class="diff-target-area" style="position:absolute; top:10px; left:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('scar', '깨끗한 지느러미 ✨', '상어 지느러미의 번개 상처가 깨끗하게 지워졌어요!')">
                <span style="font-size:3.5rem;">⚡</span>
              </div>
              <div id="diff_left_subwindow" class="diff-target-area" style="position:absolute; top:15px; right:20px; width:100px; height:50px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('subwindow', '창문 3개 🥽', '잠수함 관람창이 2개에서 3개로 늘어났어요!')">
                <span style="font-size:2.2rem;">🥽🥽</span>
              </div>
              <div id="diff_left_shark" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('shark', '해파리 다리 4개 🪼', '해파리 다리가 6개에서 4개로 줄어들었어요!')">
                <span style="font-size:5rem;">🦈</span>
              </div>
              <div id="diff_left_coral" class="diff-target-area" style="position:absolute; bottom:15px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('coral', '주황색 산호 🪸', '바닥 보라 산호초가 주황색 산호초로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🟣</span>
              </div>
              <div id="diff_left_rays" class="diff-target-area" style="position:absolute; bottom:15px; right:65px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('rays', '놀란 가오리 😮', '가오리가 웃는 표정 대신 😮 놀란 표정이에요!')">
                <span style="font-size:2.8rem;">😀</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_right_scar" class="diff-target-area" style="position:absolute; top:10px; left:25px; width:65px; height:65px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('scar', '깨끗한 지느러미 ✨', '상어 지느러미의 번개 상처가 깨끗하게 지워졌어요!')">
                <span style="font-size:3.5rem;">✨</span>
              </div>
              <div id="diff_right_subwindow" class="diff-target-area" style="position:absolute; top:15px; right:20px; width:100px; height:50px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('subwindow', '창문 3개 🥽', '잠수함 관람창이 2개에서 3개로 늘어났어요!')">
                <span style="font-size:2.2rem;">🥽🥽🥽</span>
              </div>
              <div id="diff_right_shark" class="diff-target-area" style="width:110px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('shark', '해파리 다리 4개 🪼', '해파리 다리가 6개에서 4개로 줄어들었어요!')">
                <span style="font-size:5rem;">🪼</span>
              </div>
              <div id="diff_right_coral" class="diff-target-area" style="position:absolute; bottom:15px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('coral', '주황색 산호 🪸', '바닥 보라 산호초가 주황색 산호초로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🟠</span>
              </div>
              <div id="diff_right_rays" class="diff-target-area" style="position:absolute; bottom:15px; right:65px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('rays', '놀란 가오리 😮', '가오리가 웃는 표정 대신 😮 놀란 표정이에요!')">
                <span style="font-size:2.8rem;">😮</span>
              </div>
            </div>
          `,
          diffs: ["scar", "subwindow", "shark", "coral", "rays"],
          leftBg: "#ebf8ff",
          rightBg: "#ebf8ff"
        }
      ],
      level4: [
        {
          id: 16,
          title: "4단계 1번: 미니 로봇 공장 🤖",
          diffCount: 6,
          promptText: "로봇 공장에서 다른 6곳(톱니바퀴, 램프, 스위치, 바늘, 파이프, 볼트)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_left_lamp" class="diff-target-area" style="position:absolute; top:5px; left:25px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('lamp', '초록 램프 🟢', '안테나 램프가 빨간색에서 초록색으로 바뀌었어요!')">
                <span style="font-size:2.5rem;">🔴</span>
              </div>
              <div id="diff_left_pipe" class="diff-target-area" style="position:absolute; top:10px; right:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('pipe', '은색 파이프 🪙', '배관 파이프 조인트가 은색으로 바뀌었어요!')">
                <span style="font-size:2.5rem;">🟤</span>
              </div>
              <div id="diff_left_gauge" class="diff-target-area" style="width:100px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('gauge', '반시계 바늘 🧭', '가슴 계기판 바늘 방향이 반대로 꺾였어요!')">
                <span style="font-size:4.8rem;">🤖</span>
              </div>
              <div id="diff_left_switch" class="diff-target-area" style="position:absolute; top:75px; left:20px; width:90px; height:45px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('switch', '스위치 4개 🔘', '제어판 스위치 버튼이 3개에서 4개로 늘었어요!')">
                <span style="font-size:1.8rem;">🔘🔘🔘</span>
              </div>
              <div id="diff_left_gear" class="diff-target-area" style="position:absolute; bottom:15px; left:20px; width:100px; height:50px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('gear', '톱니바퀴 3개 ⚙️', '컨베이어 벨트 톱니바퀴가 3개로 줄었어요!')">
                <span style="font-size:2.2rem;">⚙️⚙️⚙️⚙️</span>
              </div>
              <div id="diff_left_bolt" class="diff-target-area" style="position:absolute; bottom:15px; right:25px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bolt', '나사 볼트 1개 🔩', '바닥 나사 볼트가 1개로 줄어들었어요!')">
                <span style="font-size:2.5rem;">🔩🔩</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_right_lamp" class="diff-target-area" style="position:absolute; top:5px; left:25px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('lamp', '초록 램프 🟢', '안테나 램프가 빨간색에서 초록색으로 바뀌었어요!')">
                <span style="font-size:2.5rem;">🟢</span>
              </div>
              <div id="diff_right_pipe" class="diff-target-area" style="position:absolute; top:10px; right:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('pipe', '은색 파이프 🪙', '배관 파이프 조인트가 은색으로 바뀌었어요!')">
                <span style="font-size:2.5rem;">⚪</span>
              </div>
              <div id="diff_right_gauge" class="diff-target-area" style="width:100px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('gauge', '반시계 바늘 🧭', '가슴 계기판 바늘 방향이 반대로 꺾였어요!')">
                <span style="font-size:4.8rem;">👾</span>
              </div>
              <div id="diff_right_switch" class="diff-target-area" style="position:absolute; top:75px; left:20px; width:90px; height:45px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('switch', '스위치 4개 🔘', '제어판 스위치 버튼이 3개에서 4개로 늘었어요!')">
                <span style="font-size:1.8rem;">🔘🔘🔘🔘</span>
              </div>
              <div id="diff_right_gear" class="diff-target-area" style="position:absolute; bottom:15px; left:20px; width:100px; height:50px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('gear', '톱니바퀴 3개 ⚙️', '컨베이어 벨트 톱니바퀴가 3개로 줄었어요!')">
                <span style="font-size:2.2rem;">⚙️⚙️⚙️</span>
              </div>
              <div id="diff_right_bolt" class="diff-target-area" style="position:absolute; bottom:15px; right:25px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bolt', '나사 볼트 1개 🔩', '바닥 나사 볼트가 1개로 줄어들었어요!')">
                <span style="font-size:2.5rem;">🔩</span>
              </div>
            </div>
          `,
          diffs: ["lamp", "pipe", "gauge", "switch", "gear", "bolt"],
          leftBg: "#f7fafc",
          rightBg: "#f7fafc"
        },
        {
          id: 17,
          title: "4단계 2번: 북적북적 시장 골목 🛒",
          diffCount: 6,
          promptText: "시장 골목에서 다른 6곳(간판, 파라솔, 당근 개수, 장바구니, 저울, 고양이 꼬리)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_left_sign" class="diff-target-area" style="position:absolute; top:5px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('sign', '딸기 간판 🍓', '과일 가게 간판 이모지가 사과에서 딸기로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🍎</span>
              </div>
              <div id="diff_left_umbrella" class="diff-target-area" style="position:absolute; top:10px; right:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('umbrella', '노란 파라솔 🟡', '파란 파라솔이 노란색 파라솔로 바뀌었어요!')">
                <span style="font-size:3rem;">🔵</span>
              </div>
              <div id="diff_left_scale" class="diff-target-area" style="width:100px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('scale', '저울 2kg ⚖️', '저울 무게 눈금 바늘이 1kg에서 2kg을 가리켜요!')">
                <span style="font-size:4.8rem;">🏪</span>
              </div>
              <div id="diff_left_carrot" class="diff-target-area" style="position:absolute; top:75px; left:70px; width:100px; height:45px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('carrot', '당근 4개 🥕', '야채 상자 당근이 5개에서 4개로 줄었어요!')">
                <span style="font-size:1.6rem;">🥕🥕🥕🥕🥕</span>
              </div>
              <div id="diff_left_bag" class="diff-target-area" style="position:absolute; bottom:15px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bag', '체크 장바구니 🛍️', '손님의 꽃무늬 장바구니가 체크무늬로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🌸</span>
              </div>
              <div id="diff_left_cat" class="diff-target-area" style="position:absolute; bottom:15px; right:25px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('cat', '내려간 꼬리 🐈', '고양이 꼬리가 아래로 얌전히 내려갔어요!')">
                <span style="font-size:2.8rem;">🐱</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_right_sign" class="diff-target-area" style="position:absolute; top:5px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('sign', '딸기 간판 🍓', '과일 가게 간판 이모지가 사과에서 딸기로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🍓</span>
              </div>
              <div id="diff_right_umbrella" class="diff-target-area" style="position:absolute; top:10px; right:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('umbrella', '노란 파라솔 🟡', '파란 파라솔이 노란색 파라솔로 바뀌었어요!')">
                <span style="font-size:3rem;">🟡</span>
              </div>
              <div id="diff_right_scale" class="diff-target-area" style="width:100px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('scale', '저울 2kg ⚖️', '저울 무게 눈금 바늘이 1kg에서 2kg을 가리켜요!')">
                <span style="font-size:4.8rem;">⚖️</span>
              </div>
              <div id="diff_right_carrot" class="diff-target-area" style="position:absolute; top:75px; left:70px; width:100px; height:45px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('carrot', '당근 4개 🥕', '야채 상자 당근이 5개에서 4개로 줄었어요!')">
                <span style="font-size:1.6rem;">🥕🥕🥕🥕</span>
              </div>
              <div id="diff_right_bag" class="diff-target-area" style="position:absolute; bottom:15px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bag', '체크 장바구니 🛍️', '손님의 꽃무늬 장바구니가 체크무늬로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🛍️</span>
              </div>
              <div id="diff_right_cat" class="diff-target-area" style="position:absolute; bottom:15px; right:25px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('cat', '내려간 꼬리 🐈', '고양이 꼬리가 아래로 얌전히 내려갔어요!')">
                <span style="font-size:2.8rem;">🐈</span>
              </div>
            </div>
          `,
          diffs: ["sign", "umbrella", "scale", "carrot", "bag", "cat"],
          leftBg: "#fffaf0",
          rightBg: "#fffaf0"
        },
        {
          id: 18,
          title: "4단계 3번: 해적선 보물섬 항해 🏴‍☠️",
          diffCount: 6,
          promptText: "해적선에서 다른 6곳(해골 안대, 닻 문양, 보물 상자, 선장 안대, 앵무새 모자, 나침반)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_left_skull" class="diff-target-area" style="position:absolute; top:5px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('skull', '오른쪽 안대 해골 💀', '해적 깃발 해골의 안대가 반대로 바뀌었어요!')">
                <span style="font-size:3rem;">💀</span>
              </div>
              <div id="diff_left_anchor" class="diff-target-area" style="position:absolute; top:10px; right:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('anchor', '검은 닻 ⚓', '닻 문양이 검은색으로 바뀌었어요!')">
                <span style="font-size:3rem;">⚓</span>
              </div>
              <div id="diff_left_parrotcap" class="diff-target-area" style="width:100px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('parrotcap', '앵무새 페도라 🎩', '앵무새 꼬깔모자가 멋진 페도라 모자로 바뀌었어요!')">
                <span style="font-size:4.8rem;">🏴‍☠️</span>
              </div>
              <div id="diff_left_eyepatch" class="diff-target-area" style="position:absolute; top:75px; left:70px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('eyepatch', '빨간 안대 ❤️', '선장님의 안대가 빨간색으로 바뀌었어요!')">
                <span style="font-size:2.5rem;">🖤</span>
              </div>
              <div id="diff_left_chest" class="diff-target-area" style="position:absolute; bottom:15px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('chest', '보석 상자 💎', '보물상자 금화 더미가 보석 더미로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🪙</span>
              </div>
              <div id="diff_left_compass" class="diff-target-area" style="position:absolute; bottom:15px; right:25px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('compass', '남쪽 나침반 🧭', '나침반 바늘이 북쪽 대신 남쪽을 가리켜요!')">
                <span style="font-size:2.8rem;">🧭</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_right_skull" class="diff-target-area" style="position:absolute; top:5px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('skull', '오른쪽 안대 해골 💀', '해적 깃발 해골의 안대가 반대로 바뀌었어요!')">
                <span style="font-size:3rem;">☠️</span>
              </div>
              <div id="diff_right_anchor" class="diff-target-area" style="position:absolute; top:10px; right:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('anchor', '검은 닻 ⚓', '닻 문양이 검은색으로 바뀌었어요!')">
                <span style="font-size:3rem;">🖤</span>
              </div>
              <div id="diff_right_parrotcap" class="diff-target-area" style="width:100px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('parrotcap', '앵무새 페도라 🎩', '앵무새 꼬깔모자가 멋진 페도라 모자로 바뀌었어요!')">
                <span style="font-size:4.8rem;">🦜</span>
              </div>
              <div id="diff_right_eyepatch" class="diff-target-area" style="position:absolute; top:75px; left:70px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('eyepatch', '빨간 안대 ❤️', '선장님의 안대가 빨간색으로 바뀌었어요!')">
                <span style="font-size:2.5rem;">❤️</span>
              </div>
              <div id="diff_right_chest" class="diff-target-area" style="position:absolute; bottom:15px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('chest', '보석 상자 💎', '보물상자 금화 더미가 보석 더미로 바뀌었어요!')">
                <span style="font-size:2.8rem;">💎</span>
              </div>
              <div id="diff_right_compass" class="diff-target-area" style="position:absolute; bottom:15px; right:25px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('compass', '남쪽 나침반 🧭', '나침반 바늘이 북쪽 대신 남쪽을 가리켜요!')">
                <span style="font-size:2.8rem;">🔻</span>
              </div>
            </div>
          `,
          diffs: ["skull", "anchor", "parrotcap", "eyepatch", "chest", "compass"],
          leftBg: "#fefcbf",
          rightBg: "#fefcbf"
        },
        {
          id: 19,
          title: "4단계 4번: 오케스트라 연주회 🎻",
          diffCount: 6,
          promptText: "연주회 무대에서 다른 6곳(넥타이, 활 각도, 악보 음표, 트럼펫 나팔, 첼로 줄, 조명 색)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_left_bowtie" class="diff-target-area" style="position:absolute; top:5px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bowtie', '빨간 넥타이 🎀', '지휘자 나비넥타이가 빨간색으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🖤</span>
              </div>
              <div id="diff_left_note" class="diff-target-area" style="position:absolute; top:10px; right:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('note', '4분음표 ♩', '피아노 악보 음표가 4분음표로 바뀌었어요!')">
                <span style="font-size:2.8rem;">♪</span>
              </div>
              <div id="diff_left_bow" class="diff-target-area" style="width:100px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bow', '아래 향한 활 🎻', '바이올린 활 각도가 아래로 꺾였어요!')">
                <span style="font-size:4.8rem;">🎻</span>
              </div>
              <div id="diff_left_trumpet" class="diff-target-area" style="position:absolute; top:75px; left:70px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('trumpet', '작은 나팔 📯', '트럼펫 나팔 입구가 작아졌어요!')">
                <span style="font-size:2.5rem;">🎺</span>
              </div>
              <div id="diff_left_light" class="diff-target-area" style="position:absolute; bottom:15px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('light', '분홍 조명 🩷', '무대 조명이 노란색에서 분홍색으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🟡</span>
              </div>
              <div id="diff_left_cello" class="diff-target-area" style="position:absolute; bottom:15px; right:25px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('cello', '첼로 3줄 🪕', '첼로 줄이 4줄에서 3줄로 줄어들었어요!')">
                <span style="font-size:2.8rem;">🎻</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_right_bowtie" class="diff-target-area" style="position:absolute; top:5px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bowtie', '빨간 넥타이 🎀', '지휘자 나비넥타이가 빨간색으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🎀</span>
              </div>
              <div id="diff_right_note" class="diff-target-area" style="position:absolute; top:10px; right:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('note', '4분음표 ♩', '피아노 악보 음표가 4분음표로 바뀌었어요!')">
                <span style="font-size:2.8rem;">♩</span>
              </div>
              <div id="diff_right_bow" class="diff-target-area" style="width:100px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('bow', '아래 향한 활 🎻', '바이올린 활 각도가 아래로 꺾였어요!')">
                <span style="font-size:4.8rem;">🎸</span>
              </div>
              <div id="diff_right_trumpet" class="diff-target-area" style="position:absolute; top:75px; left:70px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('trumpet', '작은 나팔 📯', '트럼펫 나팔 입구가 작아졌어요!')">
                <span style="font-size:2.5rem;">📯</span>
              </div>
              <div id="diff_right_light" class="diff-target-area" style="position:absolute; bottom:15px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('light', '분홍 조명 🩷', '무대 조명이 노란색에서 분홍색으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🩷</span>
              </div>
              <div id="diff_right_cello" class="diff-target-area" style="position:absolute; bottom:15px; right:25px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('cello', '첼로 3줄 🪕', '첼로 줄이 4줄에서 3줄로 줄어들었어요!')">
                <span style="font-size:2.8rem;">🪕</span>
              </div>
            </div>
          `,
          diffs: ["bowtie", "note", "bow", "trumpet", "light", "cello"],
          leftBg: "#faf5ff",
          rightBg: "#faf5ff"
        },
        {
          id: 20,
          title: "4단계 5번: 신비로운 판타지 숲 🦄",
          diffCount: 6,
          promptText: "판타지 숲에서 다른 6곳(유니콘 뿔, 버섯 점, 요정 날개, 샘물 색, 열매, 유성)을 찾으세요!",
          leftHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_left_horn" class="diff-target-area" style="position:absolute; top:5px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('horn', '은빛 유니콘 뿔 🦄', '유니콘 뿔이 반짝이는 은빛으로 바뀌었어요!')">
                <span style="font-size:3rem;">🦄</span>
              </div>
              <div id="diff_left_meteor" class="diff-target-area" style="position:absolute; top:10px; right:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('meteor', '유성 궤적 💫', '유성이 별빛을 내뿜으며 지나가요!')">
                <span style="font-size:2.8rem;">🌠</span>
              </div>
              <div id="diff_left_fairy" class="diff-target-area" style="width:100px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('fairy', '요정 날개 2개 🦋', '요정 날개가 4개에서 2개로 줄어들었어요!')">
                <span style="font-size:4.8rem;">🧚‍♀️</span>
              </div>
              <div id="diff_left_shroom" class="diff-target-area" style="position:absolute; top:75px; left:70px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('shroom', '노란 점 버섯 🍄', '버섯 갓의 흰 점이 노란색 점으로 바뀌었어요!')">
                <span style="font-size:2.5rem;">🍄</span>
              </div>
              <div id="diff_left_spring" class="diff-target-area" style="position:absolute; bottom:15px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('spring', '붉은 샘물 🔴', '샘물 빛깔이 에메랄드에서 붉은 루비빛으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">💚</span>
              </div>
              <div id="diff_left_berry" class="diff-target-area" style="position:absolute; bottom:15px; right:25px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('berry', '별 모양 열매 ⭐', '나무 열매가 동그라미에서 별 모양으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🍎</span>
              </div>
            </div>
          `,
          rightHTML: `
            <div style="position:relative; width:100%; height:100%; display:flex; justify-content:space-around; align-items:center;">
              <div id="diff_right_horn" class="diff-target-area" style="position:absolute; top:5px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('horn', '은빛 유니콘 뿔 🦄', '유니콘 뿔이 반짝이는 은빛으로 바뀌었어요!')">
                <span style="font-size:3rem;">🦓</span>
              </div>
              <div id="diff_right_meteor" class="diff-target-area" style="position:absolute; top:10px; right:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('meteor', '유성 궤적 💫', '유성이 별빛을 내뿜으며 지나가요!')">
                <span style="font-size:2.8rem;">💫</span>
              </div>
              <div id="diff_right_fairy" class="diff-target-area" style="width:100px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('fairy', '요정 날개 2개 🦋', '요정 날개가 4개에서 2개로 줄어들었어요!')">
                <span style="font-size:4.8rem;">🦋</span>
              </div>
              <div id="diff_right_shroom" class="diff-target-area" style="position:absolute; top:75px; left:70px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('shroom', '노란 점 버섯 🍄', '버섯 갓의 흰 점이 노란색 점으로 바뀌었어요!')">
                <span style="font-size:2.5rem;">🟡</span>
              </div>
              <div id="diff_right_spring" class="diff-target-area" style="position:absolute; bottom:15px; left:20px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('spring', '붉은 샘물 🔴', '샘물 빛깔이 에메랄드에서 붉은 루비빛으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">🔴</span>
              </div>
              <div id="diff_right_berry" class="diff-target-area" style="position:absolute; bottom:15px; right:25px; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="appendixManager.clickDiffTarget('berry', '별 모양 열매 ⭐', '나무 열매가 동그라미에서 별 모양으로 바뀌었어요!')">
                <span style="font-size:2.8rem;">⭐</span>
              </div>
            </div>
          `,
          diffs: ["horn", "meteor", "fairy", "shroom", "spring", "berry"],
          leftBg: "#f0fdf4",
          rightBg: "#f0fdf4"
        }
      ]
    };

    this.currentSpotLevel = 1; // 1, 2, 3, or 4
    this.currentSpotIndex = 0; // 0 ~ 4 (5 questions per level)
    this.foundDiffs = new Set();
  }

  render(container) {
    const subName = this.subModules[this.currentSubIndex];
    let html = `
      <div class="sub-nav-bar">
        <button class="sub-nav-btn ${this.currentSubIndex===0?'active':''}" onclick="appendixManager.switchSub(0)"><i class="fa-solid fa-magnifying-glass"></i> 부록 1: 틀린그림찾기 (4단계 20문제)</button>
        <button class="sub-nav-btn ${this.currentSubIndex===1?'active':''}" onclick="appendixManager.switchSub(1)"><i class="fa-solid fa-table-cells"></i> 부록 2: 4x4 낱말퍼즐</button>
      </div>
      <div id="appendixSubWorkspace"></div>
    `;
    container.innerHTML = html;

    const workspace = document.getElementById('appendixSubWorkspace');
    if (subName === 'spotDiff') this.renderSpotDiff(workspace);
    else if (subName === 'crossword') this.renderCrossword(workspace);
  }

  switchSub(idx) {
    soundManager.playClick();
    this.currentSubIndex = idx;
    const container = document.getElementById('appendixArea');
    if (container) this.render(container);
  }

  /* --------------------------------------------------------------------------
     1. Spot the Difference (틀린그림찾기 4단계 20문제)
     -------------------------------------------------------------------------- */
  renderSpotDiff(workspace) {
    let levelTitle = "";
    if (this.currentSpotLevel === 1) levelTitle = "1단계: 간단한 그림 (3곳 찾기 - 5문제)";
    else if (this.currentSpotLevel === 2) levelTitle = "2단계: 조금 더 어려운 그림 (4곳 찾기 - 5문제)";
    else if (this.currentSpotLevel === 3) levelTitle = "3단계: 좀 더 어려운 그림 (5곳 찾기 - 5문제)";
    else levelTitle = "4단계: 복잡한 그림 (6곳 찾기 - 5문제)";

    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🔍 부록 1: 틀린그림찾기 시뮬레이터 (4단계 20문제)</h2>
          <p>${levelTitle}</p>
        </div>
        <button class="speak-btn" onclick="appendixManager.speakSpotDiffInfo()"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-bottom:1.25rem;">
        <button class="primary-btn ${this.currentSpotLevel===1?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.currentSpotLevel===1?'#38a169':'#64748b'};" onclick="appendixManager.switchSpotLevel(1)">1단계: 3곳 찾기 (5문제)</button>
        <button class="primary-btn ${this.currentSpotLevel===2?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.currentSpotLevel===2?'#3182ce':'#64748b'};" onclick="appendixManager.switchSpotLevel(2)">2단계: 4곳 찾기 (5문제)</button>
        <button class="primary-btn ${this.currentSpotLevel===3?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.currentSpotLevel===3?'#d69e2e':'#64748b'};" onclick="appendixManager.switchSpotLevel(3)">3단계: 5곳 찾기 (5문제)</button>
        <button class="primary-btn ${this.currentSpotLevel===4?'pulse':''}" style="padding:0.6rem 1.1rem; font-size:0.95rem; background:${this.currentSpotLevel===4?'#8b5cf6':'#64748b'};" onclick="appendixManager.switchSpotLevel(4)">4단계: 6곳 찾기 (5문제)</button>
      </div>

      <div id="spotDiffSubWorkspace" style="max-width:850px; margin: 0 auto;"></div>
    `;

    const subWorkspace = document.getElementById('spotDiffSubWorkspace');
    this.renderSpotDiffScene(subWorkspace);
  }

  switchSpotLevel(lvl) {
    soundManager.playClick();
    this.currentSpotLevel = lvl;
    this.currentSpotIndex = 0;
    this.foundDiffs = new Set();
    const workspace = document.getElementById('appendixSubWorkspace');
    if (workspace) this.renderSpotDiff(workspace);
  }

  speakSpotDiffInfo() {
    const counts = { 1: 3, 2: 4, 3: 5, 4: 6 };
    ttsManager.speak(`${this.currentSpotLevel}단계! 왼쪽과 오른쪽 그림을 비교하여 다른 ${counts[this.currentSpotLevel]}곳을 찾아 자유롭게 클릭해보세요!`);
  }

  renderSpotDiffScene(workspace) {
    const listKey = `level${this.currentSpotLevel}`;
    const scenes = this.spotDiffData[listKey];
    const total = scenes.length;
    const isCompleted = (this.currentSpotIndex >= total);

    if (isCompleted) {
      const levelNames = { 1: "1단계 (3곳)", 2: "2단계 (4곳)", 3: "3단계 (5곳)", 4: "4단계 (6곳)" };
      workspace.innerHTML = `
        <div class="clip-theme-card" style="padding:2.2rem; background:#f0fdf4; border:4px solid #22c55e; text-align:center;">
          <h2 style="color:#15803d; margin-bottom:0.75rem; font-size:2rem;">🎉 틀린그림찾기 ${levelNames[this.currentSpotLevel]} 5문제 완수! ⭐</h2>
          <p style="font-size:1.25rem; color:#276749;">뛰어난 눈썰미와 관찰력으로 5가지 장면의 숨은 차이점을 모두 찾아냈습니다!</p>
          <button class="primary-btn pulse" style="font-size:1.15rem; padding:0.8rem 1.8rem; background:#38a169; margin-top:1.2rem;" onclick="appendixManager.restartSpotLevel()">
            ${levelNames[this.currentSpotLevel]} 다시 도전하기 🔄
          </button>
        </div>
      `;
      soundManager.playCelebration();
      appState.addStar(1);
      ttsManager.speak(`축하합니다! 틀린그림찾기 ${levelNames[this.currentSpotLevel]} 5문제를 모두 완벽하게 성공했습니다!`);
      appState.showCelebrationModal("관찰력 왕 완벽 성공!", `${levelNames[this.currentSpotLevel]} 5가지 장면의 숨은 틀린 그림을 완벽히 잘 찾았어요! 🔍⭐`);
      return;
    }

    const curScene = scenes[this.currentSpotIndex];
    this.foundDiffs = new Set();

    workspace.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.05); padding:0.75rem 1.25rem; border-radius:14px; margin-bottom:1rem; font-weight:700;">
          <div>📌 ${curScene.title}</div>
          <div>🔍 <span style="color:#2b6cb0; font-size:1.3rem;">${this.currentSpotIndex + 1}</span> / ${total} 문제</div>
        </div>

        <div class="clip-theme-card" style="padding:0.85rem 1.2rem; background:#fffbe6; border:3px solid #3182ce; margin-bottom:1.25rem; border-radius:18px; display:flex; justify-content:space-between; align-items:center;">
          <p style="font-size:1.1rem; color:#2b6cb0; font-weight:800; margin:0;">
            ${curScene.promptText} 
            (찾은 개수: <span id="diffCountDisplay" style="color:#e53e3e; font-size:1.4rem; font-weight:900;">0</span> / ${curScene.diffCount})
          </p>
          <button class="primary-btn" style="padding:0.4rem 0.9rem; font-size:0.85rem; background:#38a169;" onclick="appendixManager.showHint()">💡 힌트 보기</button>
        </div>

        <div class="spot-diff-wrap" style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
          
          <!-- Original Image (Left) -->
          <div style="text-align:center;">
            <h4 style="margin-bottom:0.4rem; color:#2d3748;">[ 원본 그림 ]</h4>
            <div class="image-canvas-box" style="background:${curScene.leftBg}; padding:1rem; height:280px; position:relative; border-radius:18px; border:3px solid #cbd5e1;">
              ${curScene.leftHTML}
            </div>
          </div>

          <!-- Modified Image (Right - Clickable Differences) -->
          <div style="text-align:center;">
            <h4 style="margin-bottom:0.4rem; color:#e53e3e;">[ 틀린 그림 ]</h4>
            <div class="image-canvas-box" style="background:${curScene.rightBg}; padding:1rem; height:280px; position:relative; border-radius:18px; border:3px solid #f6ad55;">
              ${curScene.rightHTML}
            </div>
          </div>
        </div>

        <div id="diffListFoundText" style="margin-top:1.25rem; font-size:1.15rem; font-weight:800; color:#2d3748; min-height:2.2rem; background:rgba(0,0,0,0.03); padding:0.6rem; border-radius:12px;">
          [ 왼쪽 그림이나 오른쪽 그림에서 다른 부분을 클릭하세요! ]
        </div>
      </div>
    `;

    ttsManager.speak(curScene.promptText);
  }

  clickDiffTarget(id, name, desc) {
    const listKey = `level${this.currentSpotLevel}`;
    const scenes = this.spotDiffData[listKey];
    const curScene = scenes[this.currentSpotIndex];

    if (!this.foundDiffs.has(id)) {
      soundManager.playCorrect();
      this.foundDiffs.add(id);

      ['left', 'right'].forEach(side => {
        const targetElem = document.getElementById(`diff_${side}_${id}`);
        if (targetElem) {
          targetElem.style.border = "4px solid #e53e3e";
          targetElem.style.background = "rgba(229, 62, 62, 0.35)";
          targetElem.style.boxShadow = "0 0 15px rgba(229,62,62,0.8)";
          targetElem.style.borderRadius = "50%";
        }
      });

      const countDisp = document.getElementById('diffCountDisplay');
      if (countDisp) countDisp.innerText = this.foundDiffs.size;

      const txtDisp = document.getElementById('diffListFoundText');
      if (txtDisp) txtDisp.innerHTML = `⭕ <span style="color:#e53e3e;">[찾음 ${this.foundDiffs.size}/${curScene.diffCount}]</span> <b>${name}</b> - ${desc}`;

      ttsManager.speak(`찾았습니다! ${name}! ${desc}`);

      if (this.foundDiffs.size === curScene.diffCount) {
        soundManager.playCelebration();
        appState.addStar(1);
        ttsManager.speak(`축하합니다! ${curScene.title}에서 ${curScene.diffCount}곳의 다른 점을 모두 찾았습니다!`);

        setTimeout(() => {
          this.currentSpotIndex++;
          const subWorkspace = document.getElementById('spotDiffSubWorkspace');
          if (subWorkspace) this.renderSpotDiffScene(subWorkspace);
        }, 1800);
      }
    }
  }

  showHint() {
    soundManager.playClick();
    const listKey = `level${this.currentSpotLevel}`;
    const scenes = this.spotDiffData[listKey];
    const curScene = scenes[this.currentSpotIndex];

    const unfound = curScene.diffs.find(id => !this.foundDiffs.has(id));
    if (unfound) {
      ['left', 'right'].forEach(side => {
        const elem = document.getElementById(`diff_${side}_${unfound}`);
        if (elem) {
          elem.style.outline = "4px dashed #38a169";
          elem.style.animation = "pulse 1s infinite alternate";
          setTimeout(() => {
            elem.style.outline = "none";
            elem.style.animation = "none";
          }, 3000);
        }
      });
      ttsManager.speak("힌트! 반짝이는 점선 테두리 위치를 확인해보세요!");
    } else {
      ttsManager.speak("모든 다른 점을 이미 다 찾았습니다!");
    }
  }

  restartSpotLevel() {
    soundManager.playClick();
    this.currentSpotIndex = 0;
    this.foundDiffs = new Set();
    const subWorkspace = document.getElementById('spotDiffSubWorkspace');
    if (subWorkspace) this.renderSpotDiffScene(subWorkspace);
  }

  /* --------------------------------------------------------------------------
     2. 4x4 Korean Crossword Puzzle
     -------------------------------------------------------------------------- */
  renderCrossword(workspace) {
    const promptText = "4x4 가로세로 낱말퍼즐! 힌트(나비, 토끼, 나무, 기차)를 보고 네모 칸에 올바른 글자를 입력하세요!";
    workspace.innerHTML = `
      <div class="activity-header">
        <div class="activity-header-text">
          <h2>🧩 부록 2: 4x4 가로세로 낱말 퍼즐</h2>
          <p>${promptText}</p>
        </div>
        <button class="speak-btn" onclick="ttsManager.speak('${promptText}')"><i class="fa-solid fa-volume-high"></i></button>
      </div>

      <div class="grid-2" style="max-width:850px; margin: 0 auto;">
        <!-- Hints Box -->
        <div class="clip-theme-card" style="padding:1.5rem;">
          <h4 style="color:var(--text-muted); margin-bottom:0.75rem;">🧩 퍼즐 힌트 목록:</h4>
          <ul style="list-style:none; line-height:1.8; font-size:1.05rem;">
            <li><strong>가로 1:</strong> 예쁜 날개를 펼쳐 날아다니는 곤충 🦋 (<strong>나비</strong>)</li>
            <li><strong>가로 2:</strong> 깡충깡충 뛰며 당근을 좋아하는 동물 🐰 (<strong>토끼</strong>)</li>
            <li><strong>세로 1:</strong> 숲속에 푸르게 우거진 식물 🌲 (<strong>나무</strong>)</li>
            <li><strong>세로 2:</strong> 칙칙폭폭 철길을 달리는 교통수단 🚂 (<strong>기차</strong>)</li>
          </ul>
        </div>

        <!-- 4x4 Crossword Grid -->
        <div class="clip-theme-card" style="padding:1.5rem; text-align:center;">
          <div class="crossword-grid">
            <!-- Row 1: 나 비 (나 🌲 tree vertically connects) -->
            <input type="text" class="crossword-cell" id="cw_0_0" maxlength="1" value="나">
            <input type="text" class="crossword-cell" id="cw_0_1" maxlength="1" placeholder="비">
            <div class="crossword-cell block"></div>
            <div class="crossword-cell block"></div>

            <!-- Row 2: 무 (part of 나무) -->
            <input type="text" class="crossword-cell" id="cw_1_0" maxlength="1" placeholder="무">
            <div class="crossword-cell block"></div>
            <div class="crossword-cell block"></div>
            <div class="crossword-cell block"></div>

            <!-- Row 3: 토 끼 -->
            <input type="text" class="crossword-cell" id="cw_2_0" maxlength="1" placeholder="토">
            <input type="text" class="crossword-cell" id="cw_2_1" maxlength="1" placeholder="끼">
            <div class="crossword-cell block"></div>
            <div class="crossword-cell block"></div>

            <!-- Row 4: 기 차 -->
            <input type="text" class="crossword-cell" id="cw_3_0" maxlength="1" placeholder="기">
            <input type="text" class="crossword-cell" id="cw_3_1" maxlength="1" placeholder="차">
            <div class="crossword-cell block"></div>
            <div class="crossword-cell block"></div>
          </div>

          <div style="margin-top:1.5rem; display:flex; gap:0.5rem; justify-content:center;">
            <button class="primary-btn" onclick="appendixManager.fillCrosswordAnswers()">힌트 채우기 💡</button>
            <button class="primary-btn pulse" onclick="appendixManager.checkCrossword()">정답 확인 ⭕</button>
          </div>
        </div>
      </div>
    `;
    ttsManager.speak(promptText);
  }

  fillCrosswordAnswers() {
    soundManager.playClick();
    const answers = {
      cw_0_0: "나", cw_0_1: "비",
      cw_1_0: "무",
      cw_2_0: "토", cw_2_1: "끼",
      cw_3_0: "기", cw_3_1: "차"
    };
    Object.keys(answers).forEach(id => {
      const cell = document.getElementById(id);
      if (cell) cell.value = answers[id];
    });
    ttsManager.speak("정답 글자가 힌트로 채워졌습니다!");
  }

  checkCrossword() {
    const answers = {
      cw_0_0: "나", cw_0_1: "비",
      cw_1_0: "무",
      cw_2_0: "토", cw_2_1: "끼",
      cw_3_0: "기", cw_3_1: "차"
    };
    let isAllCorrect = true;
    Object.keys(answers).forEach(id => {
      const cell = document.getElementById(id);
      if (!cell || cell.value.trim() !== answers[id]) {
        isAllCorrect = false;
      }
    });

    if (isAllCorrect) {
      soundManager.playCelebration();
      appState.addStar(1);
      ttsManager.speak("축하합니다! 4x4 가로세로 낱말퍼즐 정답을 완벽히 맞췄습니다!");
      appState.showCelebrationModal("낱말 퍼즐 완성!", "나비, 토끼, 나무, 기차 낱말을 잘 맞췄어요! 🧩");
    } else {
      soundManager.playWrong();
      ttsManager.speak("아직 비어있는 칸이나 잘못된 글자가 있어요! 힌트를 참고하세요.");
    }
  }
}

window.appendixManager = new AppendixManager();
