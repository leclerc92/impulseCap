import { useState } from 'react';

interface User {
  id: number;
  name: string;
  avatar: string;
  status?: string;
}

interface Post {
  id: number;
  user: User;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

interface Comment {
  id: number;
  user: User;
  content: string;
  timestamp: string;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  participants: number;
  icon: string;
  progress: number;
  endDate: string;
}

const Social = () => {
  const currentUser: User = {
    id: 0,
    name: 'Marc Dubois',
    avatar: '👨',
    status: 'En pleine forme !',
  };

  const [friends] = useState<User[]>([
    { id: 1, name: 'Sophie Martin', avatar: '👩', status: '🔥 Série de 5 jours !' },
    { id: 2, name: 'Lucas Bernard', avatar: '👨‍🦽', status: '💪 Nouveau record !' },
    { id: 3, name: 'Emma Petit', avatar: '👩‍🦽', status: '🎯 Objectif atteint !' },
    { id: 4, name: 'Thomas Durand', avatar: '🧑', status: '🏃 En pause' },
    { id: 5, name: 'Julie Lambert', avatar: '👩', status: '✨ Motivée à fond' },
  ]);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: { id: 1, name: 'Sophie Martin', avatar: '👩' },
      timestamp: 'Il y a 2h',
      content: "Cinquième séance de la semaine terminée ! 🎉 Je me sens de plus en plus forte. Les exercices adaptés font vraiment la différence. Merci à cette communauté pour le soutien ! 💙",
      likes: 24,
      comments: [
        {
          id: 1,
          user: { id: 2, name: 'Lucas Bernard', avatar: '👨‍🦽' },
          content: 'Bravo Sophie ! Continue comme ça 👏',
          timestamp: 'Il y a 1h',
        },
        {
          id: 2,
          user: { id: 0, name: 'Marc Dubois', avatar: '👨' },
          content: "Super performance ! Tu m'inspires 💪",
          timestamp: 'Il y a 45min',
        },
      ],
      isLiked: true,
    },
    {
      id: 2,
      user: { id: 2, name: 'Lucas Bernard', avatar: '👨‍🦽' },
      timestamp: 'Il y a 5h',
      content: "Nouveau record personnel sur le développé assis ! 🏋️ J'ai réussi à faire 15 répétitions au lieu de 10. La progression est lente mais constante. N'abandonnez jamais !",
      image: '📊',
      likes: 31,
      comments: [
        {
          id: 1,
          user: { id: 3, name: 'Emma Petit', avatar: '👩‍🦽' },
          content: 'Incroyable Lucas ! 🔥',
          timestamp: 'Il y a 4h',
        },
        {
          id: 2,
          user: { id: 5, name: 'Julie Lambert', avatar: '👩' },
          content: 'Chapeau ! Ça donne envie de se dépasser 💯',
          timestamp: 'Il y a 3h',
        },
      ],
      isLiked: false,
    },
    {
      id: 3,
      user: { id: 3, name: 'Emma Petit', avatar: '👩‍🦽' },
      timestamp: 'Hier',
      content: "Premier mois complété avec l'app ! 🎊 J'ai fait 12 séances et je me sens tellement mieux dans mon corps. Les douleurs chroniques ont diminué. Merci pour ce programme adapté ! 🙏",
      likes: 45,
      comments: [
        {
          id: 1,
          user: { id: 1, name: 'Sophie Martin', avatar: '👩' },
          content: "C'est génial Emma ! Trop fière de toi ! ❤️",
          timestamp: 'Hier',
        },
      ],
      isLiked: true,
    },
    {
      id: 4,
      user: { id: 5, name: 'Julie Lambert', avatar: '👩' },
      timestamp: 'Hier',
      content: "Qui est motivé pour le défi '30 jours de mobilité' ? 🤸‍♀️ Je me lance demain ! Rejoignez-moi !",
      likes: 18,
      comments: [
        {
          id: 1,
          user: { id: 0, name: 'Marc Dubois', avatar: '👨' },
          content: 'Je suis partant ! On se motive ensemble 💪',
          timestamp: 'Hier',
        },
        {
          id: 2,
          user: { id: 4, name: 'Thomas Durand', avatar: '🧑' },
          content: "Compte sur moi ! Let's go ! 🚀",
          timestamp: 'Hier',
        },
      ],
      isLiked: true,
    },
  ]);

  const [challenges] = useState<Challenge[]>([
    {
      id: 1,
      title: '30 jours de mobilité',
      description: 'Une séance de mobilité par jour pendant 30 jours',
      participants: 127,
      icon: '🤸',
      progress: 45,
      endDate: '15 jours restants',
    },
    {
      id: 2,
      title: 'Challenge Force',
      description: 'Augmenter sa force de 20%',
      participants: 89,
      icon: '💪',
      progress: 30,
      endDate: '21 jours restants',
    },
    {
      id: 3,
      title: 'Régularité',
      description: '3 séances minimum par semaine',
      participants: 245,
      icon: '🎯',
      progress: 75,
      endDate: '7 jours restants',
    },
  ]);

  const [achievements] = useState([
    { id: 1, title: 'Première séance', icon: '🌟', unlocked: true },
    { id: 2, title: '5 séances', icon: '🔥', unlocked: true },
    { id: 3, title: '10 séances', icon: '💎', unlocked: true },
    { id: 4, title: 'Une semaine complète', icon: '📅', unlocked: true },
    { id: 5, title: 'Un mois', icon: '🏆', unlocked: false },
    { id: 6, title: 'Régularité parfaite', icon: '⭐', unlocked: false },
  ]);

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-8 px-4 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Social</h1>
          <p className="text-gray-600">Partagez et motivez-vous ensemble</p>
        </div>

        {/* User Profile Card */}
        <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg p-6 text-white mb-6 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-4xl">
              {currentUser.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{currentUser.name}</h2>
              <p className="text-blue-100">{currentUser.status}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-blue-100">Séances</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{friends.length}</div>
              <div className="text-xs text-blue-100">Amis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4</div>
              <div className="text-xs text-blue-100">Badges</div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🏆 Mes Badges
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`text-center p-3 rounded-lg border-2 ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-orange-50 to-blue-50 border-orange-300'
                    : 'bg-gray-100 border-gray-300 opacity-50'
                }`}
              >
                <div className="text-3xl mb-1">{achievement.icon}</div>
                <div className="text-xs text-gray-700 font-medium">
                  {achievement.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Challenges */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🎯 Défis Actifs
          </h3>
          <div className="space-y-3">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="border-2 border-blue-200 rounded-lg p-4 hover:border-orange-300 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{challenge.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {challenge.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {challenge.description}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {challenge.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-orange-500 h-2 rounded-full transition-all"
                          style={{ width: `${challenge.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-700">
                        {challenge.progress}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>👥 {challenge.participants} participants</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Friends Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            👥 Mes Amis
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="text-center p-3 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition cursor-pointer"
              >
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-100 to-orange-100 rounded-full flex items-center justify-center text-2xl mb-2">
                  {friend.avatar}
                </div>
                <div className="text-sm font-semibold text-gray-800 truncate">
                  {friend.name.split(' ')[0]}
                </div>
                {friend.status && (
                  <div className="text-xs text-gray-500 mt-1 truncate">
                    {friend.status}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Social Feed */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            📰 Fil d'actualité
          </h3>
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-200 transition"
              >
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-orange-100 rounded-full flex items-center justify-center text-xl">
                    {post.user.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{post.user.name}</h4>
                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-gray-700 mb-3">{post.content}</p>

                {/* Post Image */}
                {post.image && (
                  <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-lg p-8 mb-3 text-center text-6xl">
                    {post.image}
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
                      post.isLiked
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-orange-50'
                    }`}
                  >
                    <span className="text-lg">{post.isLiked ? '❤️' : '🤍'}</span>
                    <span className="font-medium text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-50 transition">
                    <span className="text-lg">💬</span>
                    <span className="font-medium text-sm">
                      {post.comments.length}
                    </span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-50 transition">
                    <span className="text-lg">🔄</span>
                    <span className="font-medium text-sm">Partager</span>
                  </button>
                </div>

                {/* Comments */}
                {post.comments.length > 0 && (
                  <div className="mt-4 space-y-2 pl-4 border-l-2 border-blue-200">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{comment.user.avatar}</span>
                          <span className="font-semibold text-sm text-gray-800">
                            {comment.user.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {comment.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Motivation Box */}
        <div className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg p-6 text-white shadow-lg text-center">
          <div className="text-4xl mb-3">✨</div>
          <h3 className="text-xl font-bold mb-2">
            Citation du jour
          </h3>
          <p className="text-lg italic mb-2">
            "La seule limite à notre épanouissement de demain sera nos doutes d'aujourd'hui."
          </p>
          <p className="text-sm text-purple-100">- Franklin D. Roosevelt</p>
        </div>
      </div>
    </div>
  );
};

export default Social;
