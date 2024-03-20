import { useLazyGetGitHubListQuery } from "@/api";
import { GitHubListItem, ListRequestParams } from "@/definitions/GitHubList";
import useTimer from "@/hooks/useTimer";
import { ErrorText, ScreenCenterView } from "@/styled";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/utils";
import { useIsFocused } from "@react-navigation/native";
import React, { FC, useEffect, useMemo, useState } from "react";
import { FlatList, RefreshControl, ScrollView, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectList, setList } from "./firstSlice";
import ListItem from "./components/ListItem";
import { useTypedNavigation } from "@/hooks/useTypedNavigation";
import { AppRouteNames } from "@/router/types";


const DEFAULT_PARAMS: ListRequestParams = {
    per_page: 25,
    page:     1,
};
const MAX_SECONDS = 30;

const FirstScreen: FC = () => {
    const dispatch = useDispatch();
    const timer = useTimer(MAX_SECONDS);
    const list = useSelector(selectList);
    const navigation = useTypedNavigation();
    
    const [getList, { isFetching, isError, error }] = useLazyGetGitHubListQuery();

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetchList();
            timer.toggle(true);
        } else {
            timer.toggle(false);
        }
    }, [isFocused]);

    useEffect(() => {
        console.log(timer.seconds);
        if (timer.seconds >= MAX_SECONDS) {
            fetchList();
            timer.reset();
        }
    }, [timer.seconds]);

    const fetchList = () => {
        getList(DEFAULT_PARAMS)
            .unwrap()
            .then(list => {
                console.log("Fetch list data: ", list);
                dispatch(setList(list));
            });
    };

    const onRefresh = () => {
        fetchList();
        timer.reset();
    };
    

    const ErrorNotify = (): JSX.Element => {
        let message = "Something went wrong.";

        if (isFetchBaseQueryError(error)) {
            message = "error" in error ? error.error : JSON.stringify(error.data);
        } else if (isErrorWithMessage(error)) {
            message = error.message;
        }
        return <ErrorText>{message}</ErrorText>;
    };

    const handleItemPress = (item: GitHubListItem) => {
        navigation.navigate(
            AppRouteNames.FirstDetail, 
            { details: item }
        );
    };

    const reversedList = useMemo(() => ([...list].reverse()), [list]);


    if (isFetching) {
        return (
            <>
                <Text>Seconds: {timer.seconds}</Text>
                <ScreenCenterView>
                    <Text>Loading data...</Text>
                </ScreenCenterView>
            </>
        );
    }

    return (
        <>
            <Text>Seconds: {timer.seconds}</Text>

            {isError && ErrorNotify()}

            <FlatList
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={onRefresh} />
                }
                data={reversedList}
                renderItem={({ item }) => <ListItem item={item} onPress={handleItemPress} />}
                keyExtractor={item => String(item.id)}
            />
        </>
    );
};

export default FirstScreen;
