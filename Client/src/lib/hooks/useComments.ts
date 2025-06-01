import { useEffect, useRef } from 'react';

import { runInAction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

type CommentStore = {
  comments: ChatComment[];
  hubConnection: HubConnection | null;
  createHubConnection(activityId: string): void;
  stopConnection(): void;
};

type UseCommentsParamsType = {
  activityId?: string;
};

type UseCommentsReturnType = {
  commentStore: CommentStore;
};

export const useComments = (params: UseCommentsParamsType = {}): UseCommentsReturnType => {
  const isConnectionCreated = useRef(false);

  const commentStore = useLocalObservable<CommentStore>(() => ({
    comments: [],
    hubConnection: null,

    createHubConnection(activityId: string) {
      if (!params.activityId) return;

      this.hubConnection = new HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_COMMENT_URL}?activityId=${activityId}`, {
          withCredentials: true,
        })
        .withAutomaticReconnect()
        .build();

      this.hubConnection.start().catch((error: unknown) => {
        console.error('Error starting SignalR connection:', error);
      });

      this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
        runInAction(() => {
          this.comments = comments;
        });
      });

      this.hubConnection.on('ReceiveComment', (comment: ChatComment) => {
        runInAction(() => {
          this.comments.unshift(comment);
        });
      });
    },
    stopConnection() {
      if (this.hubConnection?.state === HubConnectionState.Connected) {
        this.hubConnection.stop().catch((error: unknown) => {
          console.error('Error stopping SignalR connection:', error);
        });

        runInAction(() => {
          this.comments = [];
        });
      }
    },
  }));

  useEffect(() => {
    if (params.activityId && !isConnectionCreated.current) {
      commentStore.createHubConnection(params.activityId);

      isConnectionCreated.current = true;
    }

    return () => {
      commentStore.stopConnection();
    };
  }, [commentStore, params.activityId]);

  return { commentStore };
};
