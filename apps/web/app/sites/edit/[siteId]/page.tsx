'use client';

import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/lib/api';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { SiteType } from '@/types/SitesType';

export default function EditSitePage() {
  const { siteId } = useParams() as { siteId: string };
  const router = useRouter();
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  const {
    data,
    error: errorSWR,
    isLoading,
    mutate,
  } = useSWR(
    siteId ? `${process.env.NEXT_PUBLIC_API_URL}/sites/${siteId}` : null,
    (url) => fetcher(url, token)
  );

  const [site, setSite] = useState<SiteType | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (data) setSite(data[0]);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!site) return;
    setIsSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sites/${siteId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(site),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Failed to update');
      } else {
        await mutate();
        setSuccess('Site updated successfully!');
      }
    } catch (err) {
      console.error(err);
      setError('Error updating the site. Please try again later.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <Loading page="edit site" />;
  if (errorSWR) return <Error page="edit site" err={errorSWR} />;
  if (!site) return <Error page="requested site" err="Site not found" />;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#030526] via-[#1E0359] to-[#030526] text-gray-200">
      <Layout>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <button
              onClick={() => router.back()}
              className="text-gray-400 hover:text-[#79d3d3] transition"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold text-white">Edit Site</h1>
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500"
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400"
            >
              {success}
            </motion.p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { label: 'Site Name', key: 'name' },
              { label: 'Domain', key: 'domain' },
              { label: 'Language', key: 'language' },
              { label: 'Legislation', key: 'legislation' },
            ].map(({ label, key }, idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <label className="block text-sm text-gray-400 mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  value={(site as any)[key]}
                  onChange={(e) =>
                    setSite({ ...(site as SiteType), [key]: e.target.value })
                  }
                  required
                  className="w-full bg-[#1E0359]/40 backdrop-blur-md border border-[#8C0368]/30 rounded-xl px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C0368]"
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm text-gray-400 mb-1">Notes</label>
              <textarea
                rows={4}
                value={site.observations || ''}
                onChange={(e) =>
                  setSite({
                    ...(site as SiteType),
                    observations: e.target.value,
                  })
                }
                placeholder="e.g. My site is about..."
                className="w-full bg-[#1E0359]/40 backdrop-blur-md border border-[#8C0368]/30 rounded-xl px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C0368]"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSaving}
              className="w-full bg-[#8C0368] hover:bg-[#A429A6] text-white rounded-xl px-4 py-2 font-semibold transition disabled:opacity-50"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </motion.button>
          </form>
        </motion.div>
      </Layout>
    </main>
  );
}
