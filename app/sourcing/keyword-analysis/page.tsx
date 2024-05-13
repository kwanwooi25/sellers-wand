// import KeywordAnalysisPage from '@/components/pages/KeywordAnalysis';
// import { withAuth } from '@/lib/auth/hoc';

import { withAuth } from '@/lib/auth/hoc';

// export default withAuth(KeywordAnalysisPage);

export default withAuth(() => (
  <div>
    <h2>키워드 분석 페이지</h2>
  </div>
));
