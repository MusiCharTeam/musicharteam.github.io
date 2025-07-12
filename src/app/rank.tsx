import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Crown } from "lucide-react";

interface RankItem {
  id: number;
  rank: number;
  username: string;
  avatar: string;
  accuracy: number;
  playTime: string;
  totalScore: number;
}

const mockRankData: RankItem[] = [
  {
    id: 1,
    rank: 1,
    username: "ShadowFox23",
    avatar: "/avatar1.jpg",
    accuracy: 98.5,
    playTime: "156小時",
    totalScore: 1250000
  },
  {
    id: 2,
    rank: 2,
    username: "NeonBlaze41",
    avatar: "/avatar2.jpg",
    accuracy: 92.5,
    playTime: "88小時",
    totalScore: 680000
  },
  {
    id: 3,
    rank: 3,
    username: "QuantumPanda7",
    avatar: "/avatar3.jpg",
    accuracy: 85.8,
    playTime: "128小時",
    totalScore: 980000
  },
  {
    id: 4,
    rank: 4,
    username: "StellarJumper",
    avatar: "/avatar4.jpg",
    accuracy: 96.8,
    playTime: "62小時",
    totalScore: 400000
  },
  {
    id: 5,
    rank: 5,
    username: "CyberPhoenix9",
    avatar: "/avatar5.jpg",
    accuracy: 89.2,
    playTime: "115小時",
    totalScore: 850000
  },
  {
    id: 6,
    rank: 6,
    username: "MysticRaven12",
    avatar: "/avatar6.jpg",
    accuracy: 87.5,
    playTime: "68小時",
    totalScore: 480000
  },
  {
    id: 7,
    rank: 7,
    username: "NovaWolf",
    avatar: "/avatar7.jpg",
    accuracy: 95.5,
    playTime: "75小時",
    totalScore: 560000
  },
  {
    id: 8,
    rank: 8,
    username: "PixelDrifter5",
    avatar: "/avatar8.jpg",
    accuracy: 83.2,
    playTime: "55小時",
    totalScore: 320000
  },
  {
    id: 9,
    rank: 9,
    username: "SolarFlareX",
    avatar: "/avatar9.jpg",
    accuracy: 91.8,
    playTime: "82小時",
    totalScore: 640000
  },
  {
    id: 10,
    rank: 10,
    username: "CrimsonTide99",
    avatar: "/avatar10.jpg",
    accuracy: 94.2,
    playTime: "102小時",
    totalScore: 780000
  },
  {
    id: 11,
    rank: 11,
    username: "LunarGhost3",
    avatar: "/avatar11.jpg",
    accuracy: 88.8,
    playTime: "72小時",
    totalScore: 520000
  },
  {
    id: 12,
    rank: 12,
    username: "ThunderBoltZ",
    avatar: "/avatar12.jpg",
    accuracy: 86.5,
    playTime: "58小時",
    totalScore: 380000
  },
  {
    id: 13,
    rank: 13,
    username: "FrostGiant21",
    avatar: "/avatar13.jpg",
    accuracy: 90.2,
    playTime: "95小時",
    totalScore: 720000
  },
  {
    id: 14,
    rank: 14,
    username: "EmeraldSpectre",
    avatar: "/avatar14.jpg",
    accuracy: 84.8,
    playTime: "65小時",
    totalScore: 440000
  },
  {
    id: 15,
    rank: 15,
    username: "CosmicDuke8",
    avatar: "/avatar15.jpg",
    accuracy: 93.5,
    playTime: "108小時",
    totalScore: 860000
  },
  {
    id: 16,
    rank: 16,
    username: "IronVortex",
    avatar: "/avatar16.jpg",
    accuracy: 82.1,
    playTime: "52小時",
    totalScore: 300000
  },
  {
    id: 17,
    rank: 17,
    username: "TitaniumHawk",
    avatar: "/avatar17.jpg",
    accuracy: 89.8,
    playTime: "78小時",
    totalScore: 580000
  },
  {
    id: 18,
    rank: 18,
    username: "ObsidianWing",
    avatar: "/avatar18.jpg",
    accuracy: 81.5,
    playTime: "48小時",
    totalScore: 240000
  },
  {
    id: 19,
    rank: 19,
    username: "BlazeRunner7",
    avatar: "/avatar19.jpg",
    accuracy: 80.2,
    playTime: "45小時",
    totalScore: 200000
  },
  {
    id: 20,
    rank: 20,
    username: "MidnightByte",
    avatar: "/avatar20.jpg",
    accuracy: 78.8,
    playTime: "42小時",
    totalScore: 160000
  },
];

// 皇冠圖標組件
const CrownIcon = ({ rank }: { rank: number }) => {
  const getCrownColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500"; // 金色
      case 2:
        return "text-gray-400"; // 銀色
      case 3:
        return "text-amber-600"; // 銅色
      default:
        return "text-gray-400";
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500 font-bold"; // 金色
      case 2:
        return "text-gray-400 font-bold"; // 銀色
      case 3:
        return "text-amber-600 font-bold"; // 銅色
      default:
        return "text-primary";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Typography as="span" variant="h4" className={getRankColor(rank)}>
        #{rank}
      </Typography>
      {rank <= 3 && (
        <Crown className={`w-4 h-4 ${getCrownColor(rank)}`} />
      )}
    </div>
  );
};

export default function Rank() {
  const [selectedTab, setSelectedTab] = useState("accuracy");

  // 根據選擇的 tab 排序數據，並重新分配排名
  const sortedRankData = useMemo(() => {
    const sorted = [...mockRankData];
    let sortedData;
    
    switch (selectedTab) {
      case "accuracy":
        sortedData = sorted.sort((a, b) => b.accuracy - a.accuracy);
        break;
      case "playTime":
        // 將遊戲時數轉換為小時數進行排序
        sortedData = sorted.sort((a, b) => {
          const aHours = parseInt(a.playTime.replace("小時", ""));
          const bHours = parseInt(b.playTime.replace("小時", ""));
          return bHours - aHours;
        });
        break;
      case "totalScore":
        sortedData = sorted.sort((a, b) => b.totalScore - a.totalScore);
        break;
      default:
        sortedData = sorted;
    }

    // 重新分配排名，從1開始
    return sortedData.map((item, index) => ({
      ...item,
      rank: index + 1
    }));
  }, [selectedTab]);

  return (
    <div className="bg-transparent flex flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10 -mt-2 lg:-mt-2 mx-5 lg:mx-0 relative">
      <div className="w-full max-w-7xl bg-transparent">
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
              {/* 標題區塊 */}
              <div className="text-center space-y-4">
                <Typography as="h1" variant="h1" className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  玩家排行榜
                </Typography>
                <Typography as="p" variant="lead" className="text-base text-muted-foreground max-w-2xl">
                  查看最優秀的 MusiChar 玩家，挑戰你的極限！
                </Typography>
              </div>

              {/* 篩選器 */}
              <div className="w-full max-w-4xl flex justify-center">
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-auto">
                  <TabsList className="grid w-auto grid-cols-3">
                    <TabsTrigger value="accuracy">準確率</TabsTrigger>
                    <TabsTrigger value="playTime">遊戲時數</TabsTrigger>
                    <TabsTrigger value="totalScore">總共得分</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <span className="px-2 py-1 text-sm text-muted-foreground">...</span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">
                      200
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              {/* 排行榜 */}
              <Card className="w-full max-w-4xl">
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[80px]">排名</TableHead>
                        <TableHead>玩家</TableHead>
                        <TableHead className="text-right">準確率</TableHead>
                        <TableHead className="text-right">遊戲時數</TableHead>
                        <TableHead className="text-right">總共得分</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedRankData.map((item) => (
                        <TableRow key={item.id} className="hover:bg-muted/50">
                          <TableCell>
                            <CrownIcon rank={item.rank} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                                                              <Avatar className="h-8 w-8">
                                  <AvatarImage src={item.avatar} alt={item.username} />
                                  <AvatarFallback>{item.username.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                              <div>
                                <Typography as="p" variant="lead" className="font-semibold text-base">
                                  {item.username}
                                </Typography>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Typography as="p" variant="muted" className="text-sm font-semibold">
                              {item.accuracy}%
                            </Typography>
                          </TableCell>
                          <TableCell className="text-right">
                            <Typography as="p" variant="muted" className="text-sm">
                              {item.playTime}
                            </Typography>
                          </TableCell>
                          <TableCell className="text-right">
                            <Typography as="p" variant="muted" className="text-sm font-semibold">
                              {item.totalScore.toLocaleString()}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <span className="px-2 py-1 text-sm text-muted-foreground">...</span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">
                      200
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 