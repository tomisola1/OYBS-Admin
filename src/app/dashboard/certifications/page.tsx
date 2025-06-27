import { BtnPrimary } from '@/components/Buttons'
import Head from '@/components/Head'
import { Loader } from '@/components/Loaders'
import Table from '@/components/Table'
import { TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Certifications = () => {
  return (
    <div>
        <Head title='Notifications'/>
        {/* <div className='mt-8 flex justify-between'>
            <BtnPrimary>Send a push notification</BtnPrimary>
            <BtnPrimary className={'flex gap-1'}>
                <span>Export{" "}</span>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13V14.2C19 15.8802 19 16.7202 18.673 17.362C18.3854 17.9265 17.9265 18.3854 17.362 18.673C16.7202 19 15.8802 19 14.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V13M15 8L10 13M10 13L5 8M10 13V1" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </BtnPrimary>
        </div>
        <div className='w-full mt-10'>
        {
            responseData?.totalNotifications === 0 ? 
            <EmptyState text='No Notifications Created'/>:
            <Table
            head={['Header', 'Body', 'Date Sent', '']}
            body={responseData?.notifications?.map((notification:NotificationProps, index: number) =>
                <>
                    <tr className='border border-white' key={index}>
                        <td className='p-4 font-normal tracking-wide pl-6'>
                        {notification.title}
                        </td>
                        <td className='p-4 font-light w-1/2'>{notification.body}</td>
                        <td className='p-4 font-light'>
                            <p>{new Date(notification.createdAt).toLocaleDateString()}</p>
                        </td>
                        <td className='pl-4 py-2 font-light'>
                           <BtnPrimary className='!py-3 font-medium' onClick={()=>setIdandModal(notification)}>
                            {loading ? <Loader/> : "Resend"}
                           </BtnPrimary>
                        </td>
                        <td>
                            <TrashIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mr-3" aria-hidden="true" onClick={()=>handleDelete(notification._id)} />
                        </td>
                    </tr>
                </>
            )}
            itemsPerPage={8}
            showFilter={false}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            totalPages={responseData?.totalPages}
            isLoading={loading}
            currentPageNumber={pageNumber}
            />
        }
        </div> */}
       
        {/* <Modal
        show={showModal.create}
        hide={() => setShowModal({create: false, resend: false, download: false})}
        heading="Notifications"
        sub="Send out an app push notification"
      >
        <form className='mb-12' onSubmit={handleSubmit}> 
            <InputField placeholder='Header' change={handleChange} name='title' required/>
            <InputField as='textarea' placeholder='Body' rows={5} change={handleChange} name='body' required/>
          <BtnPrimary className="font-semibold text-base mb-6 tracking-wide w-full" type="submit">
            {loading ? <Loader/> : "Send Notifications"}
          </BtnPrimary>
         </form>
      </Modal>         */}
    </div>
  )
}

export default Certifications
