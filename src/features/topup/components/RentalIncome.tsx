import { Box, SelectItem, HStack } from '@gluestack-ui/themed';
import { InputSelect } from '../../transfer/components/InputSelect';
import { ListRenderItemInfo, FlatList } from 'react-native';
import properties from '../../property/static';
import { PropertySet, Property } from '../../property/static/type';
import { FC, useEffect, useState } from 'react';
import { QuickButtonTopup } from './QuickButtonTopup';
import { ActiveTopUpType } from '..';

interface RentalIncomeProps {
  onTopup: (price: number, description: string, unit: string | null) => void;
  active?: boolean;
  activeType: string;
}

export const RentalIncome: FC<RentalIncomeProps> = ({ onTopup, active, activeType }) => {
  const [block, setBlock] = useState<Property[]>([]);
  const [properyId, setPropertyId] = useState<string>('');
  const [activeQuickButton, setActiveQuickButton] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    setBlock([]);
    setActiveQuickButton(0);
  }, [activeType]);

  const renderBlock = (listRenderItemInfo: ListRenderItemInfo<PropertySet>) => {
    const listBlock = listRenderItemInfo.item;
    return <SelectItem label={`Block ${listBlock.id}`} value={listBlock.id} />;
  };

  const renderProperties = (listRenderItemInfo: ListRenderItemInfo<Property>) => {
    const list = listRenderItemInfo.item;
    const jsonString = JSON.stringify(list);
    return <SelectItem label={`Property - ${list.id} `} value={jsonString} />;
  };

  const onChangeBlock = (e: string) => {
    const listProperty = properties.find(item => item.id === e);
    if (listProperty) {
      setBlock(listProperty.properties);
    }
  };

  const onChangeProperty = (e: string) => {
    const propertySelected = JSON.parse(e);
    setPropertyId(propertySelected.id);
    if (activeType === ActiveTopUpType.RentForland) {
      setPrice(propertySelected.price);
    } else if (activeType === ActiveTopUpType.RentForHouse) {
      setPrice(propertySelected.housePrice + propertySelected.price);
    } else {
      setPrice(propertySelected.hotelPrice + propertySelected.price);
    }
  };

  const onChangePrice = (
    event: number,
    amount: number,
    description: string,
    unit: string | null,
  ) => {
    setActiveQuickButton(event);
    onTopup(amount, description, unit);
  };

  return (
    <Box mx={10}>
      <Box display={active ? 'flex' : 'none'} gap={10}>
        <InputSelect
          underline
          title="Block Code"
          handleChangeValue={onChangeBlock}
          placeHolder="Select Block">
          <FlatList data={properties} renderItem={renderBlock} />
        </InputSelect>
        <Box display={block.length > 0 ? 'flex' : 'none'} gap={10}>
          <InputSelect
            underline
            title="Property Code"
            handleChangeValue={onChangeProperty}
            placeHolder="Select Property">
            <FlatList data={block} renderItem={renderProperties} />
          </InputSelect>

          <HStack gap={5} mt={5} display={price === 0 ? 'none' : 'flex'}>
            <QuickButtonTopup
              display={activeType === ActiveTopUpType.RentForland}
              title={properyId}
              price={price}
              active={activeQuickButton === 1}
              type={1}
              id={properyId}
              onChangeAmount={onChangePrice}
            />
            <QuickButtonTopup
              display={activeType !== ActiveTopUpType.RentForland}
              title={activeType === ActiveTopUpType.RentForHouse ? '1 house' : '1 hotel'}
              price={price}
              active={activeQuickButton === 1}
              type={1}
              id={properyId}
              onChangeAmount={onChangePrice}
            />
            <QuickButtonTopup
              display={activeType !== ActiveTopUpType.RentForland}
              title={activeType === ActiveTopUpType.RentForHouse ? '2 houses' : '2 hotels'}
              price={2 * price}
              active={activeQuickButton === 2}
              type={2}
              id={properyId}
              onChangeAmount={onChangePrice}
            />
            <QuickButtonTopup
              display={activeType !== ActiveTopUpType.RentForland}
              title={activeType === ActiveTopUpType.RentForHouse ? '3 houses' : '3 hotels'}
              price={3 * price}
              active={activeQuickButton === 3}
              type={3}
              id={properyId}
              onChangeAmount={onChangePrice}
            />
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
