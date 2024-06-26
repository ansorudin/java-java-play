import { Box, SelectItem } from '@gluestack-ui/themed';
import { InputSelect } from '../../transfer/components/InputSelect';
import { ListRenderItemInfo, FlatList } from 'react-native';
import properties from '../static';
import { PropertySet, Property } from '../static/type';
import { FC, useState } from 'react';
import { QuickButtonProperty } from './QuickButtonProperty';
import { ActiveType } from '..';
import { useEffect } from 'react';

interface PurchasePropertyProps {
  onPurchase: (price: number, description: string, unit: string | null) => void;
  active: string;
  discount: boolean;
  saldo: number;
}

export const PurchaseProperty: FC<PurchasePropertyProps> = ({
  onPurchase,
  active,
  discount,
  saldo,
}) => {
  const [block, setBlock] = useState<Property[]>([]);
  const [activeQuickButton, setActiveQuickButton] = useState<number>(4);

  useEffect(() => {
    if (active !== ActiveType.property) {
      setBlock([]);
      setActiveQuickButton(4);
    }
  }, [active]);

  const renderBlock = (listRenderItemInfo: ListRenderItemInfo<PropertySet>) => {
    const listBlock = listRenderItemInfo.item;
    return <SelectItem label={`Block ${listBlock.id}`} value={listBlock.id} />;
  };

  const onChangePrice = (
    event: number,
    amount: number,
    description: string,
    unit: string | null,
  ) => {
    setActiveQuickButton(event);
    onPurchase(amount, description, unit);
  };

  const renderProperties = (listRenderItemInfo: ListRenderItemInfo<Property>) => {
    const list = listRenderItemInfo.item;
    const price = discount ? list.price / 2 : list.price;

    return (
      <QuickButtonProperty
        title={list.id}
        price={price}
        id={null}
        discount={discount}
        active={activeQuickButton === listRenderItemInfo.index}
        type={listRenderItemInfo.index}
        onChangeAmount={onChangePrice}
        saldo={saldo}
      />
    );
  };

  const onChangeBlock = (e: string) => {
    const listProperty = properties.find(item => item.id === e);
    if (listProperty) {
      setBlock(listProperty.properties);
    }
  };

  return (
    <Box mx={10}>
      <Box display={active === ActiveType.property ? 'flex' : 'none'} gap={20}>
        <InputSelect
          underline
          title="Block Code"
          handleChangeValue={onChangeBlock}
          placeHolder="Select Block">
          <FlatList data={properties} renderItem={renderBlock} />
        </InputSelect>

        <FlatList
          data={block}
          renderItem={renderProperties}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Box width={8} />}
        />
      </Box>
    </Box>
  );
};
