/**
 * Marketplace Blocks - Milano V3
 * 
 * Agent Grid, Metrics Ribbon, Marketplace Tables
 * AI-native content structures, dynamic data adapters
 */

import React from 'react'
import { motion } from 'framer-motion'
import { TYPOGRAPHY, RADIUS, SHADOWS, MOTION } from '../milano-v3-design-tokens'
import { AgentCard, MarketplaceCard } from './commerce-primitives'

export type AgentGridProps = {
  title: string
  subtitle?: string
  agents: Array<{
    name: string
    description: string
    icon: string
    category: string
    rating: number
    usageCount: number
    isNew?: boolean
  }>
  columns?: 2 | 3 | 4
}

export type MetricsRibbonProps = {
  metrics: Array<{
    label: string
    value: string
    change?: string
    trend?: 'up' | 'down' | 'neutral'
    icon?: string
  }>
  layout?: 'horizontal' | 'grid'
}

export type MarketplaceFeedProps = {
  title: string
  items: Array<{
    id: string
    title: string
    description: string
    image: string
    vendor: string
    rating: number
    productCount: number
    category: string
  }>
  layout?: 'grid' | 'list'
  columns?: 2 | 3 | 4
}

export type DeploymentPanelProps = {
  deployments: Array<{
    name: string
    status: 'running' | 'stopped' | 'error'
    uptime: string
    region: string
    lastDeployed: string
  }>
}

export type ActivityFeedProps = {
  activities: Array<{
    type: 'deployment' | 'agent' | 'marketplace' | 'user'
    title: string
    description: string
    timestamp: string
    icon?: string
  }>
}

// AgentGrid - AI marketplace grid
export function AgentGrid({
  title = "AI Agents",
  subtitle = "Discover intelligent automation for your workflow",
  agents = [
    { name: "Code Assistant", description: "AI-powered code review and suggestions", icon: "🤖", category: "Development", rating: 4.9, usageCount: 1200, isNew: true },
    { name: "Data Analyzer", description: "Transform raw data into insights", icon: "📊", category: "Analytics", rating: 4.8, usageCount: 890 },
    { name: "Content Writer", description: "Generate blog posts and articles", icon: "✍️", category: "Content", rating: 4.7, usageCount: 2100 }
  ],
  columns = 3
}: AgentGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h2
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: TYPOGRAPHY.fonts.display }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: TYPOGRAPHY.fonts.grotesk }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div className={`grid gap-6 ${gridCols[columns]}`}>
        {agents.map((agent, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <AgentCard {...agent} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// MetricsRibbon - Linear/Vercel inspired metrics
export function MetricsRibbon({
  metrics = [
    { label: "Active Agents", value: "1,247", change: "+12%", trend: 'up', icon: "🤖" },
    { label: "Deployments", value: "892", change: "+8%", trend: 'up', icon: "🚀" },
    { label: "Uptime", value: "99.97%", change: "0%", trend: 'neutral', icon: "✅" },
    { label: "Response Time", value: "42ms", change: "-5%", trend: 'down', icon: "⚡" }
  ],
  layout = 'horizontal'
}: MetricsRibbonProps) {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className={`max-w-7xl mx-auto px-6 ${layout === 'horizontal' ? 'flex flex-wrap justify-center gap-8 md:gap-16' : 'grid grid-cols-2 md:grid-cols-4 gap-8'}`}>
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="text-center"
          >
            {metric.icon && <div className="text-3xl mb-3">{metric.icon}</div>}
            <div
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-1"
              style={{ fontFamily: TYPOGRAPHY.fonts.grotesk }}
            >
              {metric.value}
            </div>
            <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
            {metric.change && (
              <span className={`text-xs font-semibold ${
                metric.trend === 'up' ? 'text-green-600' :
                metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {metric.change}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// MarketplaceFeed - Dynamic marketplace table
export function MarketplaceFeed({
  title = "Trending Now",
  items = [],
  layout = 'grid',
  columns = 3
}: MarketplaceFeedProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2
        className="text-3xl font-bold mb-10"
        style={{ fontFamily: TYPOGRAPHY.fonts.display }}
      >
        {title}
      </h2>

      {layout === 'grid' ? (
        <div className={`grid gap-6 ${gridCols[columns]}`}>
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <MarketplaceCard {...item} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex gap-6 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
              style={{ borderRadius: RADIUS.lg }}
            >
              <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-bold" style={{ fontFamily: TYPOGRAPHY.fonts.ui }}>{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>{item.vendor}</span>
                  <span>★ {item.rating}</span>
                  <span>{item.productCount} products</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}

// DeploymentPanel - Enterprise deployment status
export function DeploymentPanel({
  deployments = [
    { name: "Production API", status: 'running', uptime: "99.99%", region: "US-East", lastDeployed: "2 hours ago" },
    { name: "Staging Environment", status: 'running', uptime: "98.5%", region: "EU-West", lastDeployed: "1 day ago" },
    { name: "Dev Server", status: 'stopped', uptime: "N/A", region: "US-West", lastDeployed: "3 days ago" }
  ]
}: DeploymentPanelProps) {
  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: TYPOGRAPHY.fonts.ui }}>
        Deployment Status
      </h2>

      <div className="space-y-4">
        {deployments.map((dep, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200"
            style={{ borderRadius: RADIUS.lg }}
          >
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${
                dep.status === 'running' ? 'bg-green-500' :
                dep.status === 'error' ? 'bg-red-500' : 'bg-gray-400'
              }`} />
              <div>
                <h3 className="font-semibold" style={{ fontFamily: TYPOGRAPHY.fonts.grotesk }}>{dep.name}</h3>
                <p className="text-sm text-gray-500">{dep.region} • Last deployed {dep.lastDeployed}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-sm font-semibold ${
                dep.status === 'running' ? 'text-green-600' :
                dep.status === 'error' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {dep.status}
              </span>
              <p className="text-xs text-gray-500 mt-1">Uptime: {dep.uptime}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ActivityFeed - Real-time activity stream
export function ActivityFeed({
  activities = [
    { type: 'deployment', title: "API v2.3 deployed", description: "Production deployment completed successfully", timestamp: "2 min ago", icon: "🚀" },
    { type: 'agent', title: "New agent published", description: "Code Assistant v2.1 is now available", timestamp: "15 min ago", icon: "🤖" },
    { type: 'marketplace', title: "Vendor onboarded", description: "Premium Electronics joined the marketplace", timestamp: "1 hour ago", icon: "🏪" }
  ]
}: ActivityFeedProps) {
  return (
    <section className="py-12 px-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: TYPOGRAPHY.fonts.ui }}>
        Recent Activity
      </h2>

      <div className="space-y-6">
        {activities.map((activity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="flex gap-4"
          >
            <div className="text-2xl flex-shrink-0">{activity.icon}</div>
            <div className="flex-1 border-b border-gray-100 pb-6">
              <h3 className="font-semibold" style={{ fontFamily: TYPOGRAPHY.fonts.grotesk }}>{activity.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-2">{activity.timestamp}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// Puck Schemas for marketplace blocks
export const MarketplaceSchemas = {
  AgentGrid: {
    fields: {
      title: { type: 'text' },
      subtitle: { type: 'textarea' },
      columns: { type: 'select', options: [{ label: '2 Columns', value: 2 }, { label: '3 Columns', value: 3 }, { label: '4 Columns', value: 4 }] }
    }
  },
  MetricsRibbon: {
    fields: {
      layout: { type: 'select', options: [{ label: 'Horizontal', value: 'horizontal' }, { label: 'Grid', value: 'grid' }] }
    }
  },
  MarketplaceFeed: {
    fields: {
      title: { type: 'text' },
      layout: { type: 'select', options: [{ label: 'Grid', value: 'grid' }, { label: 'List', value: 'list' }] },
      columns: { type: 'select', options: [{ label: '2 Columns', value: 2 }, { label: '3 Columns', value: 3 }, { label: '4 Columns', value: 4 }] }
    }
  }
}
