import { Box, SelectItem, HStack } from '@gluestack-ui/themed';
import { InputSelect } from './InputSelect';
import { ListRenderItemInfo, FlatList } from 'react-native';
import properties from '../static';
import { PropertySet, Property } from '../static/type';
import { FC, useState } from 'react';
import { TransferType } from './InputDataTransfer';
import { ButtonActive } from './ButtonActive';
import { QuickButtonProperty } from './QuickButtonProperty';

interface PurchasePropertyProps {
  transferDestination: string;
  onPurchase: (price: string, description: string) => void;
}

enum ActiveType {
  property = 'buy property',
  house = 'buy house',
  hotel = 'buy hotel',
}

export const PurchaseProperty: FC<PurchasePropertyProps> = ({
  transferDestination,
  onPurchase,
}) => {
  const [block, setBlock] = useState<Property[]>([]);
  const [active, setActive] = useState<string>(ActiveType.property);
  const [activeQuickButton, setActiveQuickButton] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);

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
    let priceSelected: number = 0;
    if (active === ActiveType.property) {
      priceSelected = propertySelected.price;
    } else if (active === ActiveType.hotel) {
      priceSelected = propertySelected.hotelPrice;
    } else {
      priceSelected = propertySelected.housePrice;
    }
    setPrice(priceSelected);
    onPurchase(priceSelected.toString(), propertySelected.id);
  };

  const onChangePrice = (event: number, amount: number) => {
    setActiveQuickButton(event);
    onPurchase(amount.toString(), '1');
  };

  return (
    <Box display={transferDestination === TransferType.property ? 'flex' : 'none'}>
      <HStack justifyContent="flex-start" gap={10} marginBottom={15}>
        <ButtonActive
          onPress={() => {
            setPrice(0);
            setBlock([]);
            setActive(ActiveType.property);
          }}
          title="Property"
          active={active === ActiveType.property}
        />
        <ButtonActive
          onPress={() => {
            setPrice(0);
            setBlock([]);
            setActive(ActiveType.house);
          }}
          title="House"
          active={active === ActiveType.house}
        />
        <ButtonActive
          onPress={() => {
            setPrice(0);
            setBlock([]);
            setActive(ActiveType.hotel);
          }}
          title="Hotel"
          active={active === ActiveType.hotel}
        />
      </HStack>

      <Box display={active === ActiveType.property ? 'flex' : 'none'} gap={10}>
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

          <InputSelect
            underline
            title="Price"
            isDisabled
            handleChangeValue={() => {}}
            selectedValue={price?.toLocaleString()}>
            <SelectItem label={price?.toLocaleString()} value={price?.toLocaleString()} />
          </InputSelect>
        </Box>
      </Box>

      <Box display={active === ActiveType.house ? 'flex' : 'none'} gap={10}>
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
          <HStack gap={10} mt={5}>
            <QuickButtonProperty
              title="1 house"
              price={price}
              active={activeQuickButton === 1}
              type={1}
              onChangeAmount={onChangePrice}
            />
            <QuickButtonProperty
              title="2 houses"
              price={2 * price}
              active={activeQuickButton === 2}
              type={2}
              onChangeAmount={onChangePrice}
            />
            <QuickButtonProperty
              title="3 houses"
              price={3 * price}
              active={activeQuickButton === 3}
              type={3}
              onChangeAmount={onChangePrice}
            />
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
