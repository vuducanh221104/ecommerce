import AccountItem from '~/components/AccountItem';
import { memo } from 'react';
function AccountItemMap({ searchResult }) {
    return searchResult.map((item, index) => {
        return <AccountItem key={index} data={item} />;
    });
}

export default memo(AccountItemMap);
