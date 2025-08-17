import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;          // 카드 제목 (한글)
  imgUrl?: string;        // 외부 이미지 URL
  description: ReactNode; // 설명 (한글)
  tags?: string[];        // 뱃지
};

// 이미지는 자유롭게 바꿀 예정
const FeatureList: FeatureItem[] = [
  {
    title: '안녕하세요, 방상현입니다',
    imgUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
    description: (
      <>
        React와 Flutter로 <b>직관적인 사용자 경험</b>을 설계하고,
        Spring Boot와 데이터 분석을 통해 <b>실질적인 문제를 해결</b>합니다.
        빠른 프로토타이핑과 실험을 통해 얻은 인사이트를  
          <b>실제 제품으로 구현하는 과정</b>에 깊은 관심을 갖고 있습니다.
      </>
    ),
    tags: ['Frontend', 'Backend', 'AI/ML'],
  },
];

function FeatureCard({title, imgUrl, description, tags}: FeatureItem) {
  // 링크 비활성 (display-only)
  return (
    <div className={clsx('col col--8 col--offset-2', styles.cardCol)}>
      <div className={styles.card} role="article" aria-label={title}>
        {imgUrl && (
          <div className={styles.thumbWrap}>
            <img src={imgUrl} alt={title} className={styles.thumb} loading="lazy" />
          </div>
        )}
        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.desc}>{description}</p>
          {tags && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((t) => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className="row">
          {FeatureList.map((item, idx) => (
            <FeatureCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
