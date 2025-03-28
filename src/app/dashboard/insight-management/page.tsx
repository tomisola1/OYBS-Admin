"use client"

import Head from '@/components/Head'
import React, { useEffect, useState } from 'react'
import TabMenu from '@/components/Tab'
import VisibleInsights from './visibleInsights'
import HiddenInsights from './hiddenInsights'


const InsightManagement = () => {
   const tabs = [
    {
      id: 'reported_insights',
      label: 'Reported Insights',
      component : <VisibleInsights />
   },
   {
      id: 'hidden_insights',
      label: 'Hidden Insights',
      component : <HiddenInsights />
   }
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