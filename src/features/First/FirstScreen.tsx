import { useGetGitHubListQuery } from "@/api";
import { GitHubListItem, ListRequestParams } from "@/definitions/GitHubList";
import { ErrorText, ScreenCenterView } from "@/styled";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/utils";
import { useIsFocused } from "@react-navigation/native";
import React, { FC, useCallback, useEffect } from "react";
import { Text } from "react-native";
import { useTypedNavigation } from "@/hooks/useTypedNavigation";
import { AppRouteNames } from "@/router/types";
import EventList from "./components/EventList";

const DEFAULT_PARAMS: ListRequestParams = {
    per_page: 25,
    page:     1,
};

const FirstScreen: FC = () => {
    const isFocused = useIsFocused();

    const { 
        data: list, 
        refetch, 
        isFetching, 
        isError,
        error, 
    } = useGetGitHubListQuery(DEFAULT_PARAMS, {
        pollingInterval: 30000,
        skip:            !isFocused,
    });
    const navigation = useTypedNavigation();

    useEffect(() => {
        if (isFocused && !!list) {
            refetch();
        }
    }, [isFocused]);
    

    const renderErrorNotify = useCallback(() => {
        let message = "Something went wrong.";

        if (isErrorWithMessage(error)) {
            message = error.message;
        } else if (isFetchBaseQueryError(error)) {
            message = "error" in error ? error.error : JSON.stringify(error.data);
        }
        
        return <ErrorText>{message}</ErrorText>;
    }, [error, isError]);

    const handleItemPress = (item: GitHubListItem) => {
        navigation.navigate(
            AppRouteNames.FirstDetail, 
            { details: item }
        );
    };

    if (isFetching) {
        return (
            <>
                <ScreenCenterView>
                    <Text>Loading data...</Text>
                </ScreenCenterView>
            </>
        );
    }

    return (
        <>
            {isError && renderErrorNotify()}

            <EventList
                list={list || []}
                isLoading={isFetching}
                onItemPress={handleItemPress}
                onRefresh={refetch}

            />
        </>
    );
};

export default FirstScreen;
