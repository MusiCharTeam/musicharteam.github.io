import { Faq5 } from "@/components/faq5"

const faqData = [
  {
    question: "什麼是 MusiChar？",
    answer: "MusiChar 是一款音樂節奏遊戲，主要幫助患有讀寫障礙的兒童在節奏中學習書寫文字。透過音樂的節奏感，讓學習變得更加有趣且有效。",
  },
  {
    question: "如何開始使用 MusiChar？",
    answer: "首先下載遊戲 Demo，創建帳號後即可開始體驗。遊戲提供多種難度等級，適合不同年齡和學習階段的兒童使用。",
  },
  {
    question: "MusiChar 適合什麼年齡的兒童？",
    answer: "MusiChar 主要針對 6-12 歲的兒童設計，特別是那些在讀寫方面需要額外支持的兒童。遊戲難度可以調整，適合不同學習能力的孩子。",
  },
  {
    question: "遊戲需要什麼設備？",
    answer: "MusiChar 支援 Windows系統。建議使用有音效輸出的設備，以獲得最佳的音頻體驗。遊戲也支援外接音響或耳機。",
  },
  {
    question: "如何獲得技術支援？",
    answer: "您可以加入我們的 Discord 社群尋求幫助，或查看官方文檔了解詳細的使用指南。我們也有專門的支援服務團隊為您解答問題。",
  },
  {
    question: "遊戲是免費的嗎？",
    answer: "是的！MusiChar 是完全開源的遊戲，您可以自由下載、修改和分享。",
  },
  {
    question: "如何報告遊戲問題或建議？",
    answer: "您可以透過 Discord 社群、GitHub 專案頁面或官方支援管道提交問題報告和功能建議。我們會認真考慮每一份回饋。",
  },
  {
    question: "遊戲會不定期更新嗎？",
    answer: "是的，我們會不定期發布更新，包括新的關卡、功能改進和錯誤修復。您可以關注我們的更新日誌了解最新變化。",
  },
];

export default function FaqPage() {
  return (
    <div className="bg-transparent flex flex-1 flex-col items-center justify-start min-h-screen pt-0 sm:pt-2 lg:pt-4">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-0">
          <Faq5
            heading="MusiChar 常見問題解答"
            description="了解 MusiChar 音樂節奏學習遊戲的相關問題，找到您需要的答案。"
            faqs={faqData}
          />
        </div>
      </div>
    </div>
  );
} 