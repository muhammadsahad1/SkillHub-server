 interface MonthlyData {
  _id: {
    month: number;
    year: number;
  };
}

 interface AnalyticsData {
  postData: MonthlyData[];
  groupData: MonthlyData[];
  eventData: MonthlyData[];
  userData: MonthlyData[];
}

export interface DashboardData {
  success: boolean;
  message: string;
  postsCount: number;
  groupsCount: number;
  eventsCount: number;
  usersCount: number;
  analyticsData: AnalyticsData;
}
