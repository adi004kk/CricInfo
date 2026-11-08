import React, { useState } from 'react';
import { useCricket } from '../../context/CricketContext';
import { Bookmark, Clock, Share2, BookOpen, ChevronRight, ArrowLeft } from 'lucide-react';
import { NewsArticle } from '../../types/cricket';

export const NewsView: React.FC = () => {
  const { news, selectedArticle, setSelectedArticleId, preferences, toggleSaveArticle, setActiveNavTab, setSelectedMatchId } = useCricket();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [readingArticle, setReadingArticle] = useState<NewsArticle | null>(null);

  const categories = ['all', 'Match Report', 'Analysis', 'Feature'];

  const filteredNews = selectedCategory === 'all'
    ? news
    : news.filter(n => n.category === selectedCategory);

  const isSaved = readingArticle ? preferences.savedArticles.includes(readingArticle.id) : false;

  // If viewing a full article
  if (readingArticle) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => setReadingArticle(null)}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All News</span>
        </button>

        <article className="bg-slate-900/80 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl">
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-sky-400 uppercase tracking-wider">
              {readingArticle.category}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleSaveArticle(readingArticle.id)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isSaved
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                }`}
                title="Save Article"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {readingArticle.title}
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {readingArticle.subtitle}
            </p>
          </div>

          {/* Author Byline & Date */}
          <div className="flex items-center gap-3 text-xs text-slate-400 py-3 border-y border-slate-800">
            <span className="font-semibold text-slate-200">{readingArticle.author}</span>
            <span aria-hidden="true">·</span>
            <span>{readingArticle.date}</span>
            <span aria-hidden="true">·</span>
            <span>{readingArticle.readTime}</span>
          </div>

          {/* Featured Image */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <img
              src={readingArticle.imageUrl}
              alt={readingArticle.title}
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-4 text-sm text-slate-200 leading-relaxed font-sans">
            {readingArticle.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Related Match CTA */}
          {readingArticle.relatedMatchId && (
            <div className="p-4 bg-sky-950/30 rounded-xl border border-sky-800/40 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-sky-400 font-semibold uppercase tracking-wider block">
                  Related Live Fixture
                </span>
                <span className="text-xs text-white font-medium">
                  Follow full live score & commentary for this match
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedMatchId(readingArticle.relatedMatchId!);
                  setActiveNavTab('match-center');
                }}
                className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Go to Match Centre →
              </button>
            </div>
          )}

          {/* Tags */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500">Topics:</span>
            {readingArticle.tags.map(tag => (
              <span key={tag} className="text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded text-[11px]">
                #{tag}
              </span>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Category Filters */}
      <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">Cricket News & In-Depth Editorial</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified reports, technical analysis, and on-ground dispatches
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-colors ${
                  selectedCategory === cat
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Stories' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Featured Article */}
      {filteredNews.length > 0 && (
        <div
          onClick={() => setReadingArticle(filteredNews[0])}
          className="group grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/80 hover:bg-slate-850 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer shadow-lg overflow-hidden"
        >
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                FEATURED STORY · {filteredNews[0].category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                {filteredNews[0].title}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {filteredNews[0].summary}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 pt-3 border-t border-slate-800/80">
              <span className="font-semibold text-slate-200">{filteredNews[0].author}</span>
              <span aria-hidden="true">·</span>
              <span>{filteredNews[0].date}</span>
              <span aria-hidden="true">·</span>
              <span>{filteredNews[0].readTime}</span>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl overflow-hidden bg-slate-950 h-56 lg:h-full">
            <img
              src={filteredNews[0].imageUrl}
              alt={filteredNews[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {/* Grid of Other Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.slice(1).map(article => (
          <div
            key={article.id}
            onClick={() => setReadingArticle(article)}
            className="group bg-slate-900/60 hover:bg-slate-850 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="h-44 overflow-hidden bg-slate-950">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                  {article.category}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-800/80">
                <span>{article.author}</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
