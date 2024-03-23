import { RefreshControl, FlatList } from "react-native";
import React, { FC, useMemo } from "react";
import { GitHubListItem } from "@/definitions/GitHubList";
import EventListItem from "./EventListItem";
import useRenderCount from "@/hooks/useRenderCount";

type EventListProps = {
    list: GitHubListItem[],
    isLoading: boolean
    onRefresh: () => void
    onItemPress: (item: GitHubListItem) => void
}

const EventList: FC<EventListProps> = ({ list, isLoading, onRefresh, onItemPress }) => {
    const reversedList = useMemo(() => [...list].reverse(), list);

    return (
        <FlatList
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
            data={reversedList}
            renderItem={({ item }) => <EventListItem item={item} onPress={onItemPress} />}
            keyExtractor={item => String(item.id)}
        />
    );
};


//compare arrays of ids
function isEqual(prevProps: EventListProps, nextProps: EventListProps) {
    const listPrevFlat = prevProps.list.map(item => item.id);
    const listNextFlat = nextProps.list.map(item => item.id);

    return (
        listPrevFlat.length === listNextFlat.length 
        && listPrevFlat.every((value, index) => value === listNextFlat[index])
    );
}

export default React.memo(EventList, isEqual);