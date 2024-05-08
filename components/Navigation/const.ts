export const NAV_LIST = [
  {
    href: '/sourcing',
    label: '소싱',
    protected: true,
    submenus: [
      {
        href: '/keyword-analysis',
        label: '키워드 분석',
        protected: true,
      },
      {
        href: '/sourcing-list',
        label: '소싱 리스트',
        protected: true,
      },
    ],
  },
  {
    href: '/analysis',
    label: '분석',
    protected: true,
    submenus: [
      {
        href: '/ad-report-analysis',
        label: '광고보고서 분석',
        protected: true,
      },
    ],
  },
  {
    href: '/book-keeping',
    label: '장부 정리',
    protected: true,
    submenus: [
      {
        href: '/products',
        label: '상품 관리',
        protected: true,
      },
      {
        href: '/inventories',
        label: '재고 관리',
        protected: true,
      },
      {
        href: '/sales',
        label: '판매 관리',
        protected: true,
      },
      {
        href: '/purchases',
        label: '구매 관리',
        protected: true,
      },
      {
        href: '/expenses',
        label: '비용 관리',
        protected: true,
      },
    ],
  },
  {
    href: '/statistics',
    label: '통계',
    protected: true,
    submenus: [
      {
        href: '/sales',
        label: '전체 매출',
        protected: true,
      },
      {
        href: '/main-product',
        label: '주력 상품 매출',
        protected: true,
      },
    ],
  },
];
