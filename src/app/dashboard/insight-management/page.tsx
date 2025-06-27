"use client"

import Head from '@/components/Head'
import React from 'react'
import TabMenu from '@/components/Tab'
import VisibleInsights from './visibleInsights'
import HiddenInsights from './hiddenInsights'
import ReportedInsights from './reportedInsights'

const InsightManagement = () => {
   const tabs = [
    {
      id: 'all_insights',
      label: 'All Insights',
      component : <VisibleInsights />
   },
   {
      id: 'hidden_insights',
      label: 'Hidden Insights',
      component : <HiddenInsights />
   },
   {
      id: 'reported_insights',
      label: 'Reported Insights',
      component : <ReportedInsights />
   },
   ]

  return (
    <div>
        <Head title='Insight Management'/>
        <div className='mt-10'>
          <TabMenu tabData={tabs} />      
        </div>
    </div>
  )
}

export default InsightManagement