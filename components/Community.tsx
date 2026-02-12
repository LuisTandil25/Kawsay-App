
import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

const Community: React.FC = () => {
  const posts = [
    {
        user: "Grower_Pro_99",
        avatar: "https://picsum.photos/seed/user1/100/100",
        time: "2h",
        content: "Increíble el vigor que están tomando con la mezcla de J Kawsay. Semana 3 de floración y los tricomas ya empiezan a asomar.",
        image: "https://picsum.photos/seed/cannabis2/600/400",
        likes: 124,
        comments: 12
    },
    {
        user: "CocoMaster",
        avatar: "https://picsum.photos/seed/user2/100/100",
        time: "5h",
        content: "¿Alguien ha probado el lavado con agua osmótica pura al final? He notado una diferencia brutal en el sabor.",
        image: null,
        likes: 45,
        comments: 31
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Comunidad</h2>
        <button className="text-sm font-bold text-emerald-500">Mis Grupos</button>
      </div>

      <div className="space-y-4">
        {posts.map((post, i) => (
          <div key={i} className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-sm">
            <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <img src={post.avatar} className="w-10 h-10 rounded-full border border-slate-600" alt={post.user} />
                    <div>
                        <h4 className="font-bold text-sm">{post.user}</h4>
                        <span className="text-[10px] text-slate-500">{post.time} ago</span>
                    </div>
                </div>
                <MoreHorizontal size={20} className="text-slate-500" />
            </div>
            
            <div className="px-4 pb-3">
                <p className="text-sm text-slate-300 leading-relaxed">{post.content}</p>
            </div>

            {post.image && (
                <img src={post.image} className="w-full aspect-video object-cover" alt="Post content" />
            )}

            <div className="p-4 flex gap-6 border-t border-slate-700/50">
                <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-red-400 transition-colors">
                    <Heart size={18} /> {post.likes}
                </button>
                <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors">
                    <MessageCircle size={18} /> {post.comments}
                </button>
                <button className="ml-auto flex items-center gap-1.5 text-xs font-bold text-slate-400">
                    <Share2 size={18} />
                </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-24 right-6 max-w-[calc(100vw-48px)] lg:right-[calc(50%-240px+24px)]">
        <button className="p-4 bg-emerald-500 text-slate-900 rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all">
            <Share2 size={24} />
        </button>
      </div>
    </div>
  );
};

export default Community;
