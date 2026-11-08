import React, { useState } from 'react';
import { useCricket } from '../../context/CricketContext';
import { Play, Clock, Eye, Film, X } from 'lucide-react';
import { VideoHighlight } from '../../types/cricket';

export const VideosView: React.FC = () => {
  const { videos } = useCricket();
  const [playingVideo, setPlayingVideo] = useState<VideoHighlight | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-xl">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Cricket Video Hub & Highlights</h1>
            <p className="text-xs text-slate-400">
              Curated official tournament highlights, bowling masterclasses, and press conferences
            </p>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div
            key={vid.id}
            onClick={() => setPlayingVideo(vid)}
            className="group bg-slate-900/60 hover:bg-slate-850 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            {/* Thumbnail with Play Overlay & Duration */}
            <div className="relative h-48 overflow-hidden bg-slate-950">
              <img
                src={vid.thumbnailUrl}
                alt={vid.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-sky-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-2.5 right-2.5 bg-black/80 px-2 py-0.5 rounded text-[11px] font-mono text-white">
                {vid.duration}
              </div>

              {/* Category */}
              <div className="absolute top-2.5 left-2.5 bg-sky-500/80 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                {vid.category}
              </div>
            </div>

            {/* Title & Metadata */}
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-slate-400">{vid.matchTitle}</span>
                <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2 mt-0.5">
                  {vid.title}
                </h3>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {vid.views}
                </span>
                <span>{vid.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Playback Modal Overlay */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-4 p-5 relative">
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                {playingVideo.category} · {playingVideo.matchTitle}
              </span>
              <h2 className="text-lg font-bold text-white mt-1 pr-8">
                {playingVideo.title}
              </h2>
            </div>

            {/* Video Player Box Simulation */}
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
              <img
                src={playingVideo.thumbnailUrl}
                alt={playingVideo.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-2xl animate-pulse">
                  <Play className="w-7 h-7 ml-1 fill-current" />
                </div>
                <span className="text-xs text-white font-medium bg-black/60 px-3 py-1 rounded-full">
                  Official Highlight Stream Ready
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span>Duration: {playingVideo.duration} · {playingVideo.views}</span>
              <button
                onClick={() => setPlayingVideo(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
