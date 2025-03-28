import {Tabs, Tab} from "@heroui/react";

type IProps = {
  tabData : Array<{
    id: string;
    label: string;
    component: React.ComponentElement<any, any>
  }>
}
const TabMenu: React.FC<IProps> = ({tabData}) => {
    
  return (
    <div>
        <Tabs
            size="md" aria-label="options" items={tabData} classNames={{base: "!w-[310px] ", tabList: "pb-0 border-b border-b-[2px] border-[#d9d9d956]", tab: "", tabContent: "!w-[145px] text-[#7C7C7C] group-data-[selected=true]:text-primary !text-base pb-4 border-b border-[#D9D9D9] group-data-[selected=true]:border-primary",cursor:"!bg-transparent"}}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {item.component}
          </Tab>
        )}
      </Tabs>
    </div>
  )
}

export default TabMenu